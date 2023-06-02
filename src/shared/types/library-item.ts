import { AllSpotifyObjects } from './spotify-objects';

export interface LibraryItem {
  id?: number;
  userId: number;
  entity: AllSpotifyObjects;
}
