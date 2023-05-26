import { Categorie } from '../../shared/types/categorie';
import { getFirstImageOrDefault } from './utils';

export const categoriesMapper = (
  categoriesResponse: SpotifyApi.MultipleCategoriesResponse,
) => {
  return categoriesResponse.categories.items.map<Categorie>(categorie => ({
    id: categorie.id,
    name: categorie.name,
    image: getFirstImageOrDefault(categorie.icons),
    type: 'link',
    href: categorie.href,
  }));
};
