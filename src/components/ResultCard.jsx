import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, ChevronDown, ChevronRight, Brain, Zap, Target, Info } from 'lucide-react';

export function ResultCard({ prediction, loading }) {
  const [showJson, setShowJson] = useState(false);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </motion.div>
    );
  }

  if (!prediction) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="text-center py-12">
          <Brain className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Ready for Analysis
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Submit the form to see diagnosis.
          </p>
        </div>
      </motion.div>
    );
  }

  const isHighRisk = prediction.final_probability >= 0.5;
  const riskColor = isHighRisk ? 'text-red-600' : 'text-green-600';
  const riskBg = isHighRisk ? 'bg-red-100 dark:bg-red-900' : 'bg-green-100 dark:bg-green-900';
  const RiskIcon = isHighRisk ? AlertCircle : CheckCircle;

  const chartData = prediction.feature_importance.map(item => ({
    feature: item.feature.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    weight: Math.abs(item.weight),
    originalWeight: item.weight,
  }));

  const probabilityData = [
    {
      label: 'Final Probability',
      value: prediction.final_probability,
      icon: Target,
      description: 'Combined AI and Quantum analysis result',
    },
    {
      label: 'AI Probability',
      value: prediction.ai_probability,
      icon: Brain,
      description: 'Traditional machine learning prediction',
    },
    {
      label: 'Quantum Refined',
      value: prediction.quantum_refined_probability,
      icon: Zap,
      description: prediction.used_quantum ? 'Quantum enhancement applied' : 'Quantum layer not used',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      {/* Diagnosis Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${riskBg} ${riskColor} mb-3`}>
          <RiskIcon className="h-4 w-4 mr-2" />
          {prediction.diagnosis}
        </div>
      </motion.div>

      {/* Probability Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        {probabilityData.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.label}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 relative group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.label}
                  </span>
                  {item.label === 'Quantum Refined' && prediction.used_quantum && (
                    <div className="relative group">
                      <Info className="h-3 w-3 text-amber-500" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Quantum blend active
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {(item.value * 100).toFixed(1)}%
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {item.description}
              </p>
            </div>
          );
        })}
      </motion.div>

      {/* Feature Importance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Feature Importance
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis 
                dataKey="feature" 
                className="text-gray-600 dark:text-gray-400"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis className="text-gray-600 dark:text-gray-400" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--tooltip-bg)',
                  border: '1px solid var(--tooltip-border)',
                  borderRadius: '8px',
                  color: 'var(--tooltip-text)'
                }}
                formatter={(value, name, props) => [
                  `${value.toFixed(3)} (${props.payload.originalWeight >= 0 ? '+' : ''}${props.payload.originalWeight.toFixed(3)})`,
                  'Weight'
                ]}
                labelFormatter={(label) => `Feature: ${label}`}
              />
              <Bar 
                dataKey="weight" 
                fill="#4f46e5"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Raw JSON Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={() => setShowJson(!showJson)}
          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {showJson ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <span>Raw Response</span>
        </button>
        
        {showJson && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3"
          >
            <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-4 rounded-xl overflow-auto max-h-64 text-gray-800 dark:text-gray-200">
              {JSON.stringify(prediction, null, 2)}
            </pre>
          </motion.div>
        )}
      </motion.div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Quantum layer uses top-K features for masking.
        </p>
      </div>
    </motion.div>
  );
}