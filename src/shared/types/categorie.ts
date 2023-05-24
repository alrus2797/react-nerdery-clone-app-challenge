import { ImageSource } from './image-data';

export interface Categorie {
  id: number;
  href: string;
  image: ImageSource;
  name: string;
  type: 'link';
}
