export interface DogImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface Dog {
  id: string;
  imageUrl: string;
  breed?: string;
}