import React, { useState } from 'react';
import { InstagramMedia } from '../types/instagram.types';
import ImageModal from './ImageModal.tsx';

interface ImageGridProps {
  media: InstagramMedia[];
  isLoading: boolean;
}

const ImageGrid: React.FC<ImageGridProps> = ({ media, isLoading }) => {
  const [selectedImage, setSelectedImage] = useState<InstagramMedia | null>(null);

  if (isLoading) {
    return <div className="image-grid loading">Loading images...</div>;
  }

  if (media.length === 0) {
    return <div className="image-grid empty">No images found</div>;
  }

  const handleImageClick = (image: InstagramMedia) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="image-grid">
        {media.map((item) => (
          <div key={item.id} className="image-item" onClick={() => handleImageClick(item)}>
            <img 
              src={item.media_type === 'VIDEO' ? item.thumbnail_url || item.media_url : item.media_url} 
              alt={item.caption || 'Instagram media'} 
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ImageGrid;