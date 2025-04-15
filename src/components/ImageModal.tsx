import React from 'react';
import { InstagramMedia } from '../types/instagram.types';

interface ImageModalProps {
  image: InstagramMedia;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        {image.media_type === 'VIDEO' ? (
          <video controls>
            <source src={image.media_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={image.media_url} alt={image.caption || 'Instagram media'} />
        )}
        
        <div className="modal-info">
          <h3>@{image.username}</h3>
          <p className="caption">{image.caption || 'No caption'}</p>
          <p className="timestamp">Posted on: {new Date(image.timestamp).toLocaleDateString()}</p>
          <a href={image.permalink} target="_blank" rel="noopener noreferrer" className="permalink">
            View on Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;