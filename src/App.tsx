import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TranslationProvider } from './contexts/TranslationContext';
import HomePage from './pages/HomePage';
import SolutionDetail from './pages/SolutionDetail';

// Scroll to section component
const ScrollToSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Scroll to top on route change
      window.scrollTo(0, 0);
    }
  }, [location]);

  return <>{children}</>;
};

function App() {
  return (
    <TranslationProvider sourceLanguage="tr">
      <Router>
        <ScrollToSection>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cozumler/:slug" element={<SolutionDetail />} />
          </Routes>
        </ScrollToSection>
      </Router>
    </TranslationProvider>
  );
}

export default App;
