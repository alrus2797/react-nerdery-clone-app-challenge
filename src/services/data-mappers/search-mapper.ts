import { Section } from '../../shared/types/section';
import { SectionItem } from '../../shared/types/section-item';
import { SpotifyEntityType } from '../../shared/types/spotify-entities';
import {
  generateAlbumDescription,
  getFirstImageOrDefault,
  joinArtists,
  sectionsDisplayNames,
} from './utils';
import { SearchSpotifyObjects } from '../../shared/types/spotify-objects';

export const searchMapper = (searchSections: SpotifyApi.SearchResponse) => {
  return Object.keys(searchSections).map(searchKey => {
    const typedSearchKey = searchKey as keyof typeof searchSections;
    const searchSection = searchSections[typedSearchKey];

    // Filtered in this way beacuse of the union of array types bug on TS
    // https://github.com/microsoft/TypeScript/issues/44373

    const filteredItems: SearchSpotifyObjects[] = [];
    searchSection?.items.forEach(item => {
      if (item) filteredItems.push(item);
    });

    const sectionItems = filteredItems?.map<SectionItem>(item => {
      const { type, name, id } = item;
      switch (type) {
        case SpotifyEntityType.ARTIST:
          return {
            name,
            image: getFirstImageOrDefault(item.images),
            description: 'Artist',
            id,
            type,
          };
        case SpotifyEntityType.ALBUM:
          return {
            name: item.name,
            image: getFirstImageOrDefault(item.images),
            description: `${generateAlbumDescription(item)}`,
            id,
            type,
            entity: item,
          };
        case SpotifyEntityType.PLAYLIST:
          return {
            name: item.name,
            image: getFirstImageOrDefault(item.images),
            description: `${item.owner.display_name}`,
            id,
            type,
            entity: item,
          };
        case SpotifyEntityType.TRACK:
          return {
            description: `${joinArtists(item.artists)}`,
            image: getFirstImageOrDefault(item.album.images),
            name: item.name,
            id,
            type,
            entity: item,
          };
        default:
          return {
            description: 'default description',
            image: {
              url: 'default url',
            },
            name: 'default name',
            id: 'default-uri',
            type: 'default-type',
          };
      }
    });
    return {
      items: sectionItems ?? [],
      title: sectionsDisplayNames[typedSearchKey],
      uri: searchKey,
      id: searchKey.slice(0, -1),
    } as Section;
  });
};
