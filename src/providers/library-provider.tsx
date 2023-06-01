import { PropsWithChildren, createContext, useState } from 'react';
interface Playlist {
  id: string;
  name: string;
  items: SpotifyApi.TrackObjectSimplified;
}

type AllSpotifyObjects =
  | SpotifyApi.AlbumObjectSimplified
  | SpotifyApi.PlaylistObjectSimplified
  | SpotifyApi.ShowObjectSimplified
  | Playlist;

type Library = AllSpotifyObjects[];

type LibraryDispatch = (arg: Library) => void;

type LibraryValueDispatch = [Library, LibraryDispatch];

const defaultLibrary = [] as Library;

const defaultLibraryContext: LibraryValueDispatch = [
  defaultLibrary,
  (_: Library) => {
    _.at(1);
  },
];

const LibraryContext = createContext<LibraryValueDispatch>(
  defaultLibraryContext,
);

export const LibraryProvider = (props: PropsWithChildren) => {
  const [library, setLibrary] = useState<Library>([]);

  return <LibraryContext.Provider {...props} value={[library, setLibrary]} />;
};
