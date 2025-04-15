import axios from 'axios';
import { InstagramMedia, InstagramMediaResponse, InstagramProfile } from '../types/instagram.types';

// Estos valores deben ser reemplazados con tus propias credenciales
const ACCESS_TOKEN = 'YOUR_INSTAGRAM_ACCESS_TOKEN';
const INSTAGRAM_USER_ID = 'YOUR_INSTAGRAM_USER_ID';

export const fetchInstagramProfile = async (): Promise<InstagramProfile> => {
  try {
    const response = await axios.get(
      `https://graph.instagram.com/v12.0/${INSTAGRAM_USER_ID}?fields=username,media_count,account_type&access_token=${ACCESS_TOKEN}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Instagram profile:', error);
    throw error;
  }
};

export const fetchInstagramMedia = async (): Promise<InstagramMedia[]> => {
  try {
    const response = await axios.get<InstagramMediaResponse>(
      `https://graph.instagram.com/v12.0/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${ACCESS_TOKEN}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Instagram media:', error);
    throw error;
  }
};
