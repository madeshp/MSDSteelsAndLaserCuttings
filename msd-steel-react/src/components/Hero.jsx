import React from 'react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text fade-in-left">
            <div className="hero-badge">
              <i className="fas fa-star"></i>
              <span>Premium Laser Cutting Services</span>
            </div>
            
            <h1 className="hero-title">
              Precision Laser Cutting & Steel Fabrication
            </h1>
            
            <p className="hero-subtitle">
              Transform your ideas into reality with our cutting-edge laser technology and expert craftsmanship. 
              From decorative panels to industrial components, we deliver precision and quality in every cut.
            </p>
            
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('contact')}
              >
                <i className="fas fa-rocket"></i>
                Get Free Quote
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('gallery')}
              >
                <i className="fas fa-images"></i>
                View Our Work
              </button>
            </div>
          </div>
          
          <div className="hero-image fade-in-right">
            <img 
              src="/images/workshop.jpg" 
              alt="Modern Laser Cutting Workshop" 
              className="hero-img"
              loading="lazy"
            />
            
            <div className="hero-badge-floating" style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'linear-gradient(135deg, var(--accent-color), #d97706)',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '600',
              animation: 'float 3s ease-in-out infinite',
              boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)'
            }}>
              <i className="fas fa-award"></i>
              <span style={{ marginLeft: '8px' }}>25+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;