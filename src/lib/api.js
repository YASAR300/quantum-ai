import axios from 'axios';

let API_BASE =
  (import.meta.env.VITE_API_BASE && import.meta.env.VITE_API_BASE.replace(/\/+$/, '')) ||
  'https://quantum-ai-backend-2.onrender.com';

let API_KEY =
  import.meta.env.VITE_API_KEY || 'supersecretapikey';

// Axios instance
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 60000, // 60 seconds for Render cold start
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

// Error formatter
function toUserError(err) {
  if (err.code === 'ECONNABORTED') return new Error('Request timed out. Please retry.');
  if (err.message && err.message.includes('Network Error'))
    return new Error('Network unreachable. Check API URL or CORS settings.');

  const status = err.response?.status;
  const detail = err.response?.data?.detail;

  if (status === 401) return new Error('Unauthorized: Training key invalid.');
  if (status === 404) return new Error('Endpoint not found.');
  if (status && detail) return new Error(`${status}: ${detail}`);
  if (status === 500) return new Error('Server error. Please try again.');
  return new Error(err.message || 'Unknown error');
}

// Retry logic
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const cfg = error.config || {};
    const retriable =
      error.code === 'ECONNABORTED' ||
      (error.message && error.message.includes('Network Error'));

    if (retriable) {
      cfg.__retryCount = cfg.__retryCount || 0;
      if (cfg.__retryCount < 2) {
        cfg.__retryCount += 1;
        const backoffMs = 1000 * Math.pow(2, cfg.__retryCount - 1); // 1s, 2s
        await new Promise((r) => setTimeout(r, backoffMs));
        return apiClient(cfg);
      }
    }
    throw toUserError(error);
  }
);

// Exported API
export const api = {
  setApiKey(key) {
    API_KEY = key;
  },

  async checkHealth() {
    const { data } = await apiClient.get('/health');
    return data;
  },

  async getModelStatus() {
    const { data } = await apiClient.get('/models/status');
    return data;
  },

  async trainModel() {
    const { data } = await apiClient.post(
      '/train',
      {},
      { headers: { 'x-api-key': API_KEY } }
    );
    return data;
  },

  async predict(features) {
    const { data } = await apiClient.post('/predict', { features });
    return data;
  },
};
