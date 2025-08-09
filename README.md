# Quantum-AI Medical Diagnosis Frontend

A modern, responsive React application for AI-powered medical diagnosis with quantum enhancement capabilities.

## Features

- 🧠 **AI-Powered Predictions**: Integration with FastAPI backend for medical diagnosis
- ⚛️ **Quantum Enhancement**: Quantum-refined probability calculations when available
- 📊 **Feature Importance Visualization**: Interactive charts showing model decision factors
- 🌗 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- 🔒 **Secure Training**: Protected model training with API key authentication
- ♿ **Accessibility**: WCAG compliant with keyboard navigation support
- 🎨 **Modern UI**: Beautiful animations with Framer Motion

## Tech Stack

- **Framework**: React 18 + JavaScript + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE=https://quantum-ai-backend-2.onrender.com
   VITE_API_KEY=supersecretapikey
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Backend Integration

This frontend integrates with a FastAPI backend that should provide the following endpoints:

### API Endpoints

- `GET /health` - Health check
- `GET /models/status` - Model training status and metrics
- `POST /train` - Train the model (requires `x-api-key` header)
- `POST /predict` - Get diagnosis prediction

### CORS Configuration

Ensure your FastAPI backend allows requests from the development server:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE` | Backend API base URL | `https://quantum-ai-backend-2.onrender.com` |
| `VITE_API_KEY` | Secret key for model training | `supersecretapikey` |

## User Interface

### Main Components

1. **Header**: App title, model status indicator, train button, and theme toggle
2. **Diagnosis Form**: Patient information input with validation
3. **Result Card**: Prediction results, probabilities, and feature importance chart

### User Flows

1. **App Load**: Check backend health and model status
2. **Model Training**: Secure model training with confirmation modal
3. **Diagnosis**: Patient symptom input and AI prediction
4. **Results**: Visual display of diagnosis, probabilities, and feature importance

## Development

### Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx
│   ├── DiagnosisForm.jsx
│   └── ResultCard.jsx
├── contexts/           # React contexts
│   └── ThemeContext.jsx
├── hooks/              # Custom hooks
│   └── useApi.js
├── lib/                # Utilities
│   └── api.js
└── App.jsx             # Main app component
```

### Key Features

- **Local Storage**: Form data persistence
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Skeleton loaders and progress indicators
- **Form Validation**: Real-time validation with error messages
- **Responsive Design**: Mobile-first approach with desktop optimizations

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios
- Focus management

## Performance

- Code splitting with React.lazy
- Optimized bundle size
- Efficient re-renders with React.memo
- Debounced API calls
- Image optimization

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- ES2020+ features used

## License

This project is proprietary software. All rights reserved.