import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Activity, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTrainModel } from '../hooks/useApi';

export function Header({ modelStatus, onModelTrained }) {
  const { isDark, toggleTheme } = useTheme();
  const { training, trainModel } = useTrainModel();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleTrainModel = async () => {
    setShowConfirm(false);
    const success = await trainModel();
    if (success) {
      onModelTrained();
    }
  };

  const statusColor = modelStatus?.trained ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
  const statusIcon = modelStatus?.trained ? CheckCircle : AlertCircle;
  const StatusIcon = statusIcon;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-6 w-6 text-indigo-600" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Quantum-AI Diagnosis
                </h1>
              </div>
              
              {modelStatus && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
                >
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {modelStatus.trained ? 'Trained' : 'Not Trained'}
                  {modelStatus.trained && modelStatus.meta && (
                    <span className="ml-1">
                      (ACC: {(modelStatus.meta.acc * 100).toFixed(1)}%
                      {modelStatus.meta.auc && `, AUC: ${modelStatus.meta.auc.toFixed(3)}`})
                    </span>
                  )}
                </motion.div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfirm(true)}
                disabled={training}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Zap className="h-4 w-4 mr-2" />
                {training ? 'Training...' : 'Train Model'}
              </motion.button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Training Confirmation Modal */}
      {showConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-6 w-6 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Train Model
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              This will train the AI model using the latest data. The process may take a few moments.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleTrainModel}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start Training
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}