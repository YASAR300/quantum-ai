import { useState, useCallback } from 'react';
import { api } from '../lib/api';
import toast from 'react-hot-toast';

export function useModelStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      const [healthStatus, modelStatus] = await Promise.all([
        api.checkHealth(),
        api.getModelStatus(),
      ]);
      
      if (healthStatus.ok) {
        setStatus(modelStatus);
      }
    } catch (error) {
      console.error('Failed to fetch status:', error);
      toast.error('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  }, []);

  return { status, loading, fetchStatus };
}

export function useTrainModel() {
  const [training, setTraining] = useState(false);

  const trainModel = useCallback(async () => {
    try {
      setTraining(true);
      toast.loading('Training model...', { id: 'training' });
      
      await api.trainModel();
      
      toast.success('Model trained!', { id: 'training' });
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Training failed. Try again.';
      toast.error(message, { id: 'training' });
      return false;
    } finally {
      setTraining(false);
    }
  }, []);

  return { training, trainModel };
}

export function usePrediction() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const predict = useCallback(async (features) => {
    try {
      setLoading(true);
      const result = await api.predict(features);
      setPrediction(result);
      return result;
    } catch (error) {
      toast.error('Prediction failed. Try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearPrediction = useCallback(() => {
    setPrediction(null);
  }, []);

  return { prediction, loading, predict, clearPrediction };
}