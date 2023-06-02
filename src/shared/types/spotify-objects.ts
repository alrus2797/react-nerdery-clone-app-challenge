import { Playlist } from './playlist';

export type AllSpotifyObjects =
  | SpotifyApi.AlbumObjectSimplified
  | SpotifyApi.PlaylistObjectSimplified
  | SpotifyApi.ShowObjectSimplified
  | Playlist;
