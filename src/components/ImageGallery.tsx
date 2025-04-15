import React, { useState } from 'react';
import ImageModal from './ImageModal.tsx';

interface ImageGalleryProps {
  images: string[];
  breedName: string;
  isLoading: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, breedName, isLoading }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) {
    return <div className="image-gallery loading">Loading dog images...</div>;
  }

  if (images.length === 0) {
    return <div className="image-gallery empty">No images found</div>;
  }

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const formattedBreedName = breedName 
    ? breedName.split('/').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    : 'Random Dogs';

  return (
    <>
      <h2 className="gallery-title">{formattedBreedName}</h2>
      <div className="image-gallery">
        {images.map((imageUrl, index) => (
          <div key={index} className="image-item" onClick={() => handleImageClick(imageUrl)}>
            <img 
              src={imageUrl} 
              alt={`${formattedBreedName} dog ${index + 1}`} 
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <ImageModal imageUrl={selectedImage} breedName={formattedBreedName} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ImageGallery;