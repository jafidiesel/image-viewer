import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
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
  const appRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const previousImagesRef = useRef<string[]>([]);

  useEffect(() => {
    // Animación inicial de la aplicación
    gsap.fromTo(appRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, {
      opacity: 1,
      duration: 1,
      ease: "power2.in"
    });
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Guardar las imágenes anteriores para animación
        previousImagesRef.current = [...images];
        
        // Si hay un contenedor main visible, animamos su salida
        if (mainRef.current && !isLoading) {
          await gsap.to(mainRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in"
          });
        }
        
        let imageData: string[];
        
        if (selectedBreed) {
          imageData = await fetchBreedImages(selectedBreed, 20);
        } else {
          imageData = await fetchRandomDogImages(20);
        }
        
        setImages(imageData);
        
        // Animamos la entrada del nuevo contenido después de cargar las imágenes
        if (mainRef.current) {
          gsap.fromTo(mainRef.current, 
            { opacity: 0, y: 20 },
            { opacity: 10, y: 0, duration: 0.5, ease: "power2.out" }
          );
        }
        
      } catch (err) {
        setError('Failed to load dog images. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [selectedBreed]);

  const handleBreedSelect = (breed: string) => {
    if (breed !== selectedBreed) {
      setSelectedBreed(breed);
    }
  };

  return (
    <div className="app" ref={appRef}>
      <Header />
      
      <BreedSelector 
        onBreedSelect={handleBreedSelect} 
        selectedBreed={selectedBreed} 
      />
      
      {error && (
        <div className="error-message">{error}</div>
      )}
      
      <main ref={mainRef}>
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