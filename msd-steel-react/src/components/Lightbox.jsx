import React, { useEffect } from 'react';

const Lightbox = ({ image, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    
    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const lightboxStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    animation: 'lightboxIn 0.3s ease-out'
  };

  const contentStyles = {
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
  };

  const closeButtonStyles = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    width: '40px',
    height: '40px',
    background: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    zIndex: 10001,
    transition: 'all 0.3s ease'
  };

  const imageStyles = {
    width: '100%',
    height: 'auto',
    maxHeight: '70vh',
    objectFit: 'contain'
  };

  const infoStyles = {
    padding: '24px',
    textAlign: 'center'
  };

  const titleStyles = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '12px'
  };

  const descriptionStyles = {
    color: '#64748b',
    lineHeight: '1.6',
    fontSize: '16px'
  };

  return (
    <div 
      style={lightboxStyles}
      onClick={handleBackdropClick}
    >
      <div style={contentStyles}>
        <button 
          style={closeButtonStyles}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(0, 0, 0, 0.9)';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0, 0, 0, 0.7)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <i className="fas fa-times"></i>
        </button>
        
        <div>
          <img 
            src={image.src} 
            alt={image.alt} 
            style={imageStyles}
          />
        </div>
        
        <div style={infoStyles}>
          <h3 style={titleStyles}>{image.title}</h3>
          <p style={descriptionStyles}>{image.description}</p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes lightboxIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Lightbox;