import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DiagnosisPage } from './pages/DiagnosisPage';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navigation />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/diagnosis" element={<DiagnosisPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </motion.main>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--tooltip-bg)',
              color: 'var(--tooltip-text)',
              border: '1px solid var(--tooltip-border)',
            },
          }}
        />
      </div>
      
      <style jsx global>{`
        :root {
          --tooltip-bg: #ffffff;
          --tooltip-border: #e5e7eb;
          --tooltip-text: #374151;
        }
        
        .dark {
          --tooltip-bg: #1f2937;
          --tooltip-border: #4b5563;
          --tooltip-text: #d1d5db;
        }
      `}</style>
    </ThemeProvider>
  );
}

export default App;