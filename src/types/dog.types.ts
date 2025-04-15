export interface DogImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface BreedInfo {
  id: string;
  name: string;
  temperament?: string;
  life_span?: string;
  origin?: string;
  image?: {
    url: string;
  };
}

export interface BreedListResponse {
  [key: string]: string[];
}