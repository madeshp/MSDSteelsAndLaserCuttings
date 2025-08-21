import emailjs from '@emailjs/browser';

// EmailJS Configuration
// IMPORTANT: Replace these with your actual EmailJS credentials
const EMAIL_CONFIG = {
  SERVICE_ID: 'your_service_id', // Replace with your EmailJS service ID
  TEMPLATE_ID: 'your_template_id', // Replace with your EmailJS template ID  
  PUBLIC_KEY: 'your_public_key' // Replace with your EmailJS public key
};

// Service name mapping
const SERVICE_NAMES = {
  'laser-cutting': 'Precision Laser Cutting',
  'decorative': 'Decorative Panels',
  'custom': 'Custom Parts',
  'architectural': 'Architectural Elements'
};

// Budget range mapping
const BUDGET_RANGES = {
  'under-1000': 'Under $1,000',
  '1000-5000': '$1,000 - $5,000',
  '5000-10000': '$5,000 - $10,000',
  '10000-25000': '$10,000 - $25,000',
  'over-25000': 'Over $25,000'
};

class EmailService {
  constructor() {
    // Initialize EmailJS with public key
    if (EMAIL_CONFIG.PUBLIC_KEY !== 'your_public_key') {
      emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
    }
  }

  async sendEmail(formData) {
    try {
      // Check if EmailJS is properly configured
      if (EMAIL_CONFIG.SERVICE_ID === 'your_service_id' || 
          EMAIL_CONFIG.TEMPLATE_ID === 'your_template_id' || 
          EMAIL_CONFIG.PUBLIC_KEY === 'your_public_key') {
        
        // Return mock success for development
        console.warn('EmailJS not configured. Using mock response for development.');
        return this.getMockResponse(formData);
      }

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        service: SERVICE_NAMES[formData.service] || formData.service,
        budget: BUDGET_RANGES[formData.budget] || formData.budget || 'Not specified',
        message: formData.message,
        to_name: 'MSD Steel Team',
        reply_to: formData.email,
        timestamp: new Date().toLocaleString()
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        return {
          success: true,
          message: 'Your quote request has been sent successfully! We\'ll get back to you within 24 hours.',
          data: response
        };
      } else {
        throw new Error('Email service returned an error');
      }

    } catch (error) {
      console.error('EmailJS Error:', error);
      
      // Return user-friendly error message
      return {
        success: false,
        message: 'Sorry, there was an error sending your request. Please try again or contact us directly at info@msdsteel.com',
        error: error.message
      };
    }
  }

  // Mock response for development/testing
  getMockResponse(formData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate network delay
        const success = Math.random() > 0.1; // 90% success rate for testing
        
        if (success) {
          resolve({
            success: true,
            message: `Thank you ${formData.name}! Your quote request for ${SERVICE_NAMES[formData.service] || formData.service} has been received. We'll contact you at ${formData.email} within 24 hours.`,
            data: { status: 200, text: 'OK' }
          });
        } else {
          resolve({
            success: false,
            message: 'Network error occurred. Please try again.',
            error: 'Mock network error'
          });
        }
      }, 1500); // Simulate 1.5 second delay
    });
  }

  // Validate email configuration
  isConfigured() {
    return (
      EMAIL_CONFIG.SERVICE_ID !== 'your_service_id' &&
      EMAIL_CONFIG.TEMPLATE_ID !== 'your_template_id' &&
      EMAIL_CONFIG.PUBLIC_KEY !== 'your_public_key'
    );
  }

  // Get configuration status for debugging
  getConfigStatus() {
    return {
      configured: this.isConfigured(),
      serviceId: EMAIL_CONFIG.SERVICE_ID !== 'your_service_id',
      templateId: EMAIL_CONFIG.TEMPLATE_ID !== 'your_template_id',
      publicKey: EMAIL_CONFIG.PUBLIC_KEY !== 'your_public_key'
    };
  }
}

// Create and export singleton instance
const emailService = new EmailService();
export default emailService;

// Export configuration for setup instructions
export { EMAIL_CONFIG, SERVICE_NAMES, BUDGET_RANGES };