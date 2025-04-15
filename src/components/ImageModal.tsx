import React from 'react';

interface ImageModalProps {
  imageUrl: string;
  breedName: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, breedName, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <img src={imageUrl} alt={`${breedName} dog`} />
        <div className="modal-info">
          <h3>{breedName}</h3>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;