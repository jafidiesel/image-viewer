import React, { useEffect, useState } from 'react';
import DogMosaic from './DogMosaic.tsx';
import { Dog, DogImage } from '../types/dog.types.ts';
import axios from 'axios';

const ConnectedDogMosaic: React.FC = () => {
  const [dogs, setDogs] = useState<(Dog | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const processDogs = (dogs: (DogImage | null)[]) => {
    const processedData: (Dog | null)[] = [];
    dogs.forEach((dog, index) => {
      if (dog) {
        // Convert DogImage to Dog
        const formattedDog = {
          id: dog.id,
          imageUrl: dog.url,
        };
        processedData.push(formattedDog); // Add the formatted element
      } else {
        processedData.push(null); // Add the empty element
      }

      // Every two elements, add an empty element
      if ((index + 1) % 2 === 0) {
        processedData.push(null); // Empty element (transparent)
      }

      // After the next element, add 4 empty spaces
      if ((index + 1) % 3 === 0) {
        processedData.push(null, null, null, null); // 4 empty elements
      }
    });
    return processedData;
  };

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setLoading(true);
        // Fetch multiple random dog images
        const response = await axios.get('https://api.thedogapi.com/v1/images/search', {
          params: {
            limit: 40, // 40 images for the mosaic
            has_breeds: 1 // Ensure they have breed information
          },
          headers: {
            'x-api-key': process.env.REACT_APP_DOG_API_KEY || '' // API key if available
          }
        }); // Fetching dog images
        
        // Repeat the results to simulate more data
        const repeatedData = Array(6) // Repeat 6 times
          .fill(response.data)
          .flat();

        const proccesedDogs = processDogs(repeatedData); // Process the data to add empty spaces

        setDogs(proccesedDogs); // Set the repeated images
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dog images:', err);
        setError('Error loading dog images. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchDogs();
  }, []);
  
  // Show loading screen
  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-black text-white">Loading dog images...</div>;
  }
  
  // Show error message
  if (error) {
    return <div className="flex h-screen items-center justify-center bg-black text-white">{error}</div>;
  }
  
  return (
    <DogMosaic 
      dogs={dogs}
      title={<>PAWSOME<span className='text-white'>Gallery</span></>}
      subtitle="The Ultimate Dog Collection"
      description="Discover | Explore | Find Your Favorite Breed"
      centerContent={
        <button className="mt-4 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
          Explore Breeds
        </button>
      }
    />
  );
};

export default ConnectedDogMosaic;