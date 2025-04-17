import axios from 'axios';
import { DogImage } from '../types/dog.types';

const THEDOGAPI_BASE_URL = 'https://api.thedogapi.com/v1';



export const fetchDogs = async (): Promise<DogImage[] | null> => {

 let response = null; 
  try {
    response = await axios.get(THEDOGAPI_BASE_URL+'/images/search', {
      params: {
        limit: 40, // 40 imágenes para el mosaico
        has_breeds: 1 // Asegurarnos de que tengan información de raza
      },
      headers: {
        'x-api-key': process.env.REACT_APP_DOG_API_KEY || '' // API key si la tienes
      }
    });
  } catch (error) {
    console.error('Error fetching dog:', error);
    throw error;
    
  }
  
  return response;
}
