import { API_BASE_URL } from '../shared/constants/api';
import { Section } from '../shared/types/section';

import axios from 'axios';
import { searchMapper } from './data-mappers/search-mapper';
import { categoriesMapper } from './data-mappers/categories-mapper';

export async function getSections() {
  const { data } = await axios.get<Section[]>(`${API_BASE_URL}/sections`);
  return data;
}

export async function getCategories() {
  const { data } = await axios.get<SpotifyApi.MultipleCategoriesResponse>(
    `${API_BASE_URL}/categories`,
  );
  return categoriesMapper(data);
}

export async function searchAll(searchText: string) {
  const { data } = await axios.get<SpotifyApi.SearchResponse>(
    `${API_BASE_URL}/search/${searchText}`,
  );
  return searchMapper(data);
}
