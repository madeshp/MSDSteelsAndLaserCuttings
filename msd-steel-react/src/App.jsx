import React from 'react';
import './styles/GlobalStyles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import components
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Import hooks
import useIntersectionObserver from './hooks/useIntersectionObserver';

function App() {
  // Initialize intersection observer for animations
  useIntersectionObserver();

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;