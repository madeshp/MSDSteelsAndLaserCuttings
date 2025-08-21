import React, { useState } from 'react';
import Lightbox from './Lightbox';

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const galleryItems = [
    {
      src: '/images/workshop.jpg',
      alt: 'Modern Laser Cutting Workshop',
      title: 'Modern Workshop',
      description: 'Our state-of-the-art laser cutting facility equipped with the latest technology for precision manufacturing.',
      delay: '0'
    },
    {
      src: '/images/laser-cutting-industrial.jpeg',
      alt: 'Industrial Laser Cutting Process',
      title: 'Industrial Cutting',
      description: 'High-precision laser cutting process for industrial applications with exceptional accuracy and clean edges.',
      delay: '100'
    },
    {
      src: '/images/precision-parts.webp',
      alt: 'Precision Cut Metal Parts',
      title: 'Precision Parts',
      description: 'High-quality custom metal parts and components fabricated to exact specifications using advanced laser cutting technology.',
      delay: '200'
    }
  ];

  const placeholderItems = [
    {
      icon: 'fas fa-plus',
      title: 'More Projects',
      description: 'Coming Soon',
      delay: '300'
    },
    {
      icon: 'fas fa-tools',
      title: 'Custom Work',
      description: 'Contact Us',
      delay: '400'
    },
    {
      icon: 'fas fa-image',
      title: 'Your Project',
      description: 'Could Be Here',
      delay: '500'
    }
  ];

  const openLightbox = (image) => {
    setCurrentImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
  };

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header fade-in-up">
          <h2 className="section-title">Our Work Gallery</h2>
          <p className="section-subtitle">
            Showcasing our precision laser cutting capabilities and craftsmanship
          </p>
        </div>
        
        <div className="gallery-wrapper">
          <div className="gallery-grid" id="galleryGrid">
            {/* Real gallery items */}
            {galleryItems.map((item, index) => (
              <div 
                key={index}
                className="gallery-item fade-in-up" 
                data-delay={item.delay}
                style={{
                  animationDelay: `${item.delay}ms`
                }}
              >
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className="gallery-img" 
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <div className="gallery-info">
                    <h3>{item.title}</h3>
                    <p>{item.description.substring(0, 60)}...</p>
                    <button 
                      className="gallery-btn"
                      onClick={() => openLightbox(item)}
                    >
                      <i className="fas fa-expand"></i>
                      View Full Size
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Placeholder items */}
            {placeholderItems.map((item, index) => (
              <div 
                key={`placeholder-${index}`}
                className="gallery-item gallery-placeholder fade-in-up" 
                data-delay={item.delay}
                style={{
                  animationDelay: `${item.delay}ms`
                }}
              >
                <div className="placeholder-content">
                  <i className={item.icon}></i>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Lightbox Modal */}
      {lightboxOpen && currentImage && (
        <Lightbox
          image={currentImage}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
};

export default Gallery;