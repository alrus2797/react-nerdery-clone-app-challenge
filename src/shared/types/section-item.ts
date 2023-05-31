import { ImageSource } from './image-data';

export interface SectionItem {
  name: string;
  description: string;
  owner?: string;
  image: ImageSource;
  id: string;
  type?: string;
}
