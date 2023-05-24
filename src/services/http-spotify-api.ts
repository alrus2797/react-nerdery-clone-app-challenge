import { API_BASE_URL } from '../shared/constants/api';
import { Categorie } from '../shared/types/categorie';
import { Section } from '../shared/types/section';
import axios from 'axios';

export async function getSections() {
  const { data } = await axios.get<Section[]>(`${API_BASE_URL}/sections`);
  return data;
}

export async function getCategories() {
  const { data } = await axios.get<Categorie[]>(`${API_BASE_URL}/categories`);
  return data;
}
