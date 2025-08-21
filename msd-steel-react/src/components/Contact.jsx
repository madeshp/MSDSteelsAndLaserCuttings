import React, { useState } from 'react';
import emailService from '../services/emailService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
    agreement: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const serviceOptions = [
    { value: 'laser-cutting', label: 'Precision Laser Cutting' },
    { value: 'decorative', label: 'Decorative Panels' },
    { value: 'custom', label: 'Custom Parts' },
    { value: 'architectural', label: 'Architectural Elements' }
  ];

  const budgetOptions = [
    { value: 'under-1000', label: 'Under $1,000' },
    { value: '1000-5000', label: '$1,000 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000-25000', label: '$10,000 - $25,000' },
    { value: 'over-25000', label: 'Over $25,000' }
  ];

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'phone':
        // Phone is optional, but if provided, should be valid
        if (value && value.trim().length > 0) {
          const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
          return !phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) ? 'Please enter a valid phone number' : '';
        }
        return '';
      case 'service':
        return !value ? 'Please select a service' : '';
      case 'message':
        return value.trim().length < 20 ? 'Message must be at least 20 characters' : '';
      case 'agreement':
        return !value ? 'You must agree to the terms and conditions' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    const error = validateField(name, fieldValue);
    
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const firstErrorField = document.querySelector('.form-input.error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await emailService.sendEmail(formData);
      
      if (result.success) {
        setSubmitSuccess(true);
        setSubmitMessage(result.message || 'Your message has been sent successfully! We\'ll get back to you within 24 hours.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          budget: '',
          message: '',
          agreement: false
        });

        // Hide success message after 15 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 15000);
      } else {
        throw new Error(result.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('Sorry, there was an error sending your request. Please try again or contact us directly at info@msdsteel.com');
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldClass = (fieldName) => {
    let className = 'form-input';
    if (errors[fieldName]) className += ' error';
    return className;
  };

  if (submitSuccess) {
    return (
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-form">
            <div className="form-success show">
              <i className="fas fa-check-circle"></i>
              <p><strong>Thank you!</strong> {submitMessage}</p>
              <button 
                className="btn btn-primary"
                onClick={() => setSubmitSuccess(false)}
                style={{ marginTop: '20px' }}
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Ready to start your next project? Contact us for a consultation</p>
        </div>
       
        <div className="contact-form">
          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="form-header">
              <h3 className="form-title">Get Your Free Quote</h3>
              <p className="form-subtitle">Tell us about your project and we'll get back to you within 24 hours</p>
            </div>
            
            {errors.submit && (
              <div className="form-error show" style={{ 
                background: '#fef2f2', 
                border: '1px solid #fecaca', 
                padding: '1rem', 
                borderRadius: '0.5rem', 
                marginBottom: '1rem' 
              }}>
                <i className="fas fa-exclamation-triangle"></i>
                <span style={{ marginLeft: '0.5rem' }}>{errors.submit}</span>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Enter your full name" 
                className={getFieldClass('name')}
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required 
              />
              {errors.name && <div className="form-error show">{errors.name}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="your.email@example.com" 
                className={getFieldClass('email')}
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required 
              />
              {errors.email && <div className="form-error show">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="+1 (555) 123-4567" 
                className={getFieldClass('phone')}
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {errors.phone && <div className="form-error show">{errors.phone}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="service" className="form-label">Service Required *</label>
              <select 
                id="service" 
                name="service" 
                className={getFieldClass('service')}
                value={formData.service}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              >
                <option value="">Choose a service...</option>
                {serviceOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.service && <div className="form-error show">{errors.service}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="budget" className="form-label">Project Budget</label>
              <select 
                id="budget" 
                name="budget" 
                className="form-input"
                value={formData.budget}
                onChange={handleInputChange}
              >
                <option value="">Select budget range (optional)</option>
                {budgetOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Project Details *</label>
              <textarea 
                id="message" 
                name="message" 
                placeholder="Please describe your project, including materials, dimensions, quantities, timeline, and any special requirements..." 
                className={`${getFieldClass('message')} form-textarea`}
                rows="6" 
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {errors.message && <div className="form-error show">{errors.message}</div>}
              <div className="form-hint">Minimum 20 characters ({formData.message.length}/20)</div>
            </div>
            
            <div className="form-group">
              <label className="form-checkbox">
                <input 
                  type="checkbox" 
                  id="agreement" 
                  name="agreement" 
                  checked={formData.agreement}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required 
                />
                <span className="checkmark"></span>
                <span className="checkbox-text">
                  I agree to the <a href="#" className="form-link">Terms of Service</a> and <a href="#" className="form-link">Privacy Policy</a> *
                </span>
              </label>
              {errors.agreement && <div className="form-error show">{errors.agreement}</div>}
            </div>
            
            <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
              <span className="btn-text" style={{ display: isSubmitting ? 'none' : 'flex' }}>
                Send Message
              </span>
              <span className="btn-loader" style={{ display: isSubmitting ? 'flex' : 'none' }}>
                <i className="fas fa-spinner fa-spin"></i>
                Sending...
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;