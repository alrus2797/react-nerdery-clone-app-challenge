import { Section } from '../../shared/types/section';
import { SectionItem } from '../../shared/types/section-item';
import {
  SearchResponseType,
  generateAlbumDescription,
  getFirstImageOrDefault,
  joinArtists,
  sectionsDisplayNames,
} from './utils';

export const searchMapper = (searchSections: SpotifyApi.SearchResponse) => {
  return Object.keys(searchSections).map(searchKey => {
    const typedSearchKey = searchKey as keyof typeof searchSections;
    const searchSection = searchSections[typedSearchKey];
    const sectionItems = searchSection?.items
      .filter(item => !!item)
      .map<SectionItem>(item => {
        const { type, name, id } = item;
        switch (type) {
          case SearchResponseType.ARTIST:
            return {
              name,
              image: getFirstImageOrDefault(item.images),
              description: 'Artista',
              id,
              type,
            };
          case SearchResponseType.ALBUM:
            return {
              name: item.name,
              image: getFirstImageOrDefault(item.images),
              description: `${generateAlbumDescription(item)}`,
              id,
              type,
              entity: item,
            };
          case SearchResponseType.PLAYLIST:
            return {
              name: item.name,
              image: getFirstImageOrDefault(item.images),
              description: `${item.owner.display_name}`,
              id,
              type,
              entity: item,
            };
          case SearchResponseType.TRACK:
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
