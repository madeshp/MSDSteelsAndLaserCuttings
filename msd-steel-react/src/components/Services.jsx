import React from 'react';

const Services = () => {
  const services = [
    {
      icon: 'fas fa-cut',
      title: 'Precision Laser Cutting',
      description: 'High-precision laser cutting for complex shapes and intricate designs with exceptional accuracy and clean edges.',
      delay: '0'
    },
    {
      icon: 'fas fa-palette',
      title: 'Decorative Panels',
      description: 'Artistic and decorative metal panels for architectural and design applications with stunning visual appeal.',
      delay: '200'
    },
    {
      icon: 'fas fa-cogs',
      title: 'Custom Parts',
      description: 'Bespoke metal parts and components tailored to your specific requirements and specifications.',
      delay: '300'
    },
    {
      icon: 'fas fa-building',
      title: 'Architectural Elements',
      description: 'Structural and decorative architectural metalwork for modern building and construction projects.',
      delay: '400'
    }
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header fade-in-up">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive laser cutting and metal fabrication solutions
          </p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-card fade-in-up" 
              data-delay={service.delay}
              style={{
                animationDelay: `${service.delay}ms`
              }}
            >
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;