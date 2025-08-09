import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { DiagnosisForm } from '../components/DiagnosisForm';
import { ResultCard } from '../components/ResultCard';
import { useModelStatus, usePrediction } from '../hooks/useApi';

export function DiagnosisPage() {
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
    </div>
  );
}