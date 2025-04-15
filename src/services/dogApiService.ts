import axios from 'axios';
import { BreedInfo, BreedListResponse } from '../types/dog.types';

const API_BASE_URL = 'https://dog.ceo/api';
const THEDOGAPI_BASE_URL = 'https://api.thedogapi.com/v1';

// No se requiere API key para la mayoría de las solicitudes, pero para algunas funciones
// avanzadas de TheDogAPI podría ser necesario registrarse para obtener una API key gratuita
const DOG_API_KEY = '';

export const fetchAllBreeds = async (): Promise<string[]> => {
  try {
    const response = await axios.get<{ message: BreedListResponse; status: string }>(
      `${API_BASE_URL}/breeds/list/all`
    );
    
    // Convertir el objeto de razas en un array plano
    const breeds: string[] = [];
    for (const [breed, subBreeds] of Object.entries(response.data.message)) {
      if (subBreeds.length === 0) {
        breeds.push(breed);
      } else {
        subBreeds.forEach(subBreed => {
          breeds.push(`${breed}/${subBreed}`);
        });
      }
    }
    
    return breeds;
  } catch (error) {
    console.error('Error fetching dog breeds:', error);
    throw error;
  }
};

export const fetchBreedImages = async (breed: string, count = 10): Promise<string[]> => {
  try {
    const response = await axios.get<{ message: string[]; status: string }>(
      `${API_BASE_URL}/breed/${breed}/images/random/${count}`
    );
    return response.data.message;
  } catch (error) {
    console.error(`Error fetching images for breed ${breed}:`, error);
    throw error;
  }
};

export const fetchRandomDogImages = async (count = 10): Promise<string[]> => {
  try {
    const response = await axios.get<{ message: string[]; status: string }>(
      `${API_BASE_URL}/breeds/image/random/${count}`
    );
    return response.data.message;
  } catch (error) {
    console.error('Error fetching random dog images:', error);
    throw error;
  }
};

export const fetchBreedDetails = async (breedName: string): Promise<BreedInfo | null> => {
  // Esta función usa la API alternativa (TheDogAPI) que ofrece más detalles sobre las razas
  try {
    const formattedBreedName = breedName.split('/')[0];
    const response = await axios.get<BreedInfo[]>(
      `${THEDOGAPI_BASE_URL}/breeds/search`,
      {
        params: { q: formattedBreedName },
        headers: DOG_API_KEY ? { 'x-api-key': DOG_API_KEY } : {}
      }
    );
    
    if (response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching details for breed ${breedName}:`, error);
    return null;
  }
};