import { useEffect } from 'react';

const useIntersectionObserver = () => {
  useEffect(() => {
    // Create intersection observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, parseInt(delay));
          
          // Stop observing this element once animated
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in'
    );

    animatedElements.forEach(element => {
      observer.observe(element);
    });

    // Cleanup function
    return () => {
      animatedElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
};

export default useIntersectionObserver;