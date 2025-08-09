import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import DiagnosisForm from './components/DiagnosisForm.jsx';
import { ResultCard } from './components/ResultCard';
import { useModelStatus, usePrediction } from './hooks/useApi';

function AppContent() {
  const { status: modelStatus, loading: statusLoading, fetchStatus } = useModelStatus();
  const { prediction, loading: predicting, predict, clearPrediction } = usePrediction();

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handlePredict = async (features) => {
    await predict(features);
  };

  const handleReset = () => {
    clearPrediction();
  };

  const handleModelTrained = () => {
    fetchStatus();
  };

  const canPredict = modelStatus?.trained === true;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header modelStatus={modelStatus} onModelTrained={handleModelTrained} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <DiagnosisForm
            onSubmit={handlePredict}
            loading={predicting}
            canPredict={canPredict}
            onReset={handleReset}
          />
          <ResultCard prediction={prediction} loading={predicting} />
        </motion.div>
      </main>
      
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
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
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
    </ThemeProvider>
  );
}

export default App;