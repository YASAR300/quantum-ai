import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { User, Heart, Activity, Cigarette, Droplets, AlertTriangle, RotateCcw } from 'lucide-react';

const initialFeatures = {
  age: 45,
  sex: 'male',
  chest_pain: false,
  high_bp: false,
  high_cholesterol: false,
  smoking: false,
  diabetes: false,
};

const lowRiskPreset = {
  age: 25,
  sex: 'female',
  chest_pain: false,
  high_bp: false,
  high_cholesterol: false,
  smoking: false,
  diabetes: false,
};

const highRiskPreset = {
  age: 65,
  sex: 'male',
  chest_pain: true,
  high_bp: true,
  high_cholesterol: true,
  smoking: true,
  diabetes: true,
};

export function DiagnosisForm({ onSubmit, loading, canPredict, onReset }) {
  const [features, setFeatures] = useState(() => {
    const saved = localStorage.getItem('diagnosis-features');
    return saved ? JSON.parse(saved) : initialFeatures;
  });

  const [errors, setErrors] = useState({});

  const saveToStorage = useCallback((newFeatures) => {
    localStorage.setItem('diagnosis-features', JSON.stringify(newFeatures));
  }, []);

  const updateFeature = useCallback((key, value) => {
    const newFeatures = { ...features, [key]: value };
    setFeatures(newFeatures);
    saveToStorage(newFeatures);
    
    // Clear error for this field
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  }, [features, errors, saveToStorage]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!features.age || features.age < 1 || features.age > 120) {
      newErrors.age = 'Age must be between 1 and 120';
    }
    
    if (!features.sex) {
      newErrors.sex = 'Please select a sex';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [features]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    await onSubmit(features);
  };

  const handleReset = () => {
    setFeatures(initialFeatures);
    setErrors({});
    saveToStorage(initialFeatures);
    onReset();
  };

  const handlePreset = (preset) => {
    setFeatures(preset);
    saveToStorage(preset);
    setErrors({});
  };

  const switchFeatures = [
    { key: 'chest_pain', label: 'Chest Pain', icon: Heart, description: 'Experiencing chest pain or discomfort' },
    { key: 'high_bp', label: 'High Blood Pressure', icon: Activity, description: 'History of hypertension' },
    { key: 'high_cholesterol', label: 'High Cholesterol', icon: Droplets, description: 'Elevated cholesterol levels' },
    { key: 'smoking', label: 'Smoking', icon: Cigarette, description: 'Current or former smoker' },
    { key: 'diabetes', label: 'Diabetes', icon: AlertTriangle, description: 'Diagnosed with diabetes' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <User className="h-6 w-6 text-indigo-600" />
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Patient Information
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Age Input */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Age
          </label>
          <input
            type="number"
            id="age"
            min="1"
            max="120"
            value={features.age}
            onChange={(e) => updateFeature('age', parseInt(e.target.value) || 0)}
            className={`w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              errors.age 
                ? 'border-red-300 dark:border-red-600' 
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            placeholder="Enter age (1-120)"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.age}</p>
          )}
        </div>

        {/* Sex Select */}
        <div>
          <label htmlFor="sex" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sex
          </label>
          <select
            id="sex"
            value={features.sex}
            onChange={(e) => updateFeature('sex', e.target.value)}
            className={`w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              errors.sex 
                ? 'border-red-300 dark:border-red-600' 
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          >
            <option value="">Select sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.sex && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.sex}</p>
          )}
        </div>

        {/* Medical Conditions */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Medical Conditions
          </h3>
          <div className="space-y-4">
            {switchFeatures.map(({ key, label, icon: Icon, description }) => (
              <div key={key} className="flex items-start space-x-3">
                <div className="flex items-center h-5">
                  <input
                    id={key}
                    type="checkbox"
                    checked={features[key]}
                    onChange={(e) => updateFeature(key, e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor={key} className="flex items-center space-x-2 text-sm cursor-pointer">
                    <Icon className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: canPredict ? 1.02 : 1 }}
            whileTap={{ scale: canPredict ? 0.98 : 1 }}
            type="submit"
            disabled={!canPredict || loading}
            className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl text-sm font-medium text-white transition-all ${
              canPredict && !loading
                ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            title={!canPredict ? 'Train the model first to enable prediction' : ''}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
              />
            ) : null}
            {loading ? 'Predicting...' : 'Predict'}
          </motion.button>

          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleReset}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </motion.button>
          </div>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => handlePreset(lowRiskPreset)}
              className="flex-1 px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              Try Low Risk
            </button>
            <button
              type="button"
              onClick={() => handlePreset(highRiskPreset)}
              className="flex-1 px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              Try High Risk
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}