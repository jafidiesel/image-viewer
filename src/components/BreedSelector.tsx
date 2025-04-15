import React, { useEffect, useState } from 'react';
import { fetchAllBreeds } from '../services/dogApiService.ts';

interface BreedSelectorProps {
  onBreedSelect: (breed: string) => void;
  selectedBreed: string;
}

const BreedSelector: React.FC<BreedSelectorProps> = ({ onBreedSelect, selectedBreed }) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        setIsLoading(true);
        const breedsData = await fetchAllBreeds();
        setBreeds(breedsData);
      } catch (err) {
        setError('Failed to load dog breeds. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBreeds();
  }, []);

  const handleBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onBreedSelect(e.target.value);
  };

  if (isLoading) {
    return <div className="breed-selector loading">Loading breeds...</div>;
  }

  if (error) {
    return <div className="breed-selector error">{error}</div>;
  }

  return (
    <div className="breed-selector">
      <label htmlFor="breed-select">Select a dog breed:</label>
      <select 
        id="breed-select" 
        value={selectedBreed} 
        onChange={handleBreedChange}
      >
        <option value="">Random (All Breeds)</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed.split('/').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BreedSelector;