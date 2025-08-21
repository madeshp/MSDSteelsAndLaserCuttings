import React from 'react';

const Features = () => {
  const features = [
    {
      icon: 'fas fa-cog',
      title: 'Precision Engineering',
      description: 'Advanced laser technology for accurate cuts and perfect finishes',
      delay: '0'
    },
    {
      icon: 'fas fa-clock',
      title: 'Fast Turnaround',
      description: 'Quick delivery without compromising on quality',
      delay: '200'
    },
    {
      icon: 'fas fa-users',
      title: 'Expert Team',
      description: 'Skilled professionals with years of experience',
      delay: '300'
    }
  ];

  return (
    <section id="about" className="features">
      <div className="container">
        <div className="section-header fade-in-up">
          <h2 className="section-title">Why Choose MSD Steel?</h2>
          <p className="section-subtitle">
            We combine cutting-edge technology with expert craftsmanship to deliver exceptional results
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature fade-in-up" 
              data-delay={feature.delay}
              style={{
                animationDelay: `${feature.delay}ms`
              }}
            >
              <i className={`${feature.icon} feature-icon`}></i>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;