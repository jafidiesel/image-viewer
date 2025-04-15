import React, { useEffect, useState } from 'react';
import Header from './components/Header.tsx';
import BreedSelector from './components/BreedSelector.tsx';
import ImageGallery from './components/ImageGallery.tsx';
import { fetchBreedImages, fetchRandomDogImages } from './services/dogApiService.ts';
import './styles.css';

const App: React.FC = () => {
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let imageData: string[];
        
        if (selectedBreed) {
          imageData = await fetchBreedImages(selectedBreed, 20);
        } else {
          imageData = await fetchRandomDogImages(20);
        }
        
        setImages(imageData);
      } catch (err) {
        setError('Failed to load dog images. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [selectedBreed]);

  return (
    <div className="app">
      <Header />
      
      <BreedSelector 
        onBreedSelect={setSelectedBreed} 
        selectedBreed={selectedBreed} 
      />
      
      {error && <div className="error-message">{error}</div>}
      
      <main>
        <ImageGallery 
          images={images} 
          breedName={selectedBreed} 
          isLoading={isLoading} 
        />
      </main>
    </div>
  );
};

export default App;
