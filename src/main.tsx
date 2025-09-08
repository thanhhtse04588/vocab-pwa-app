import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// App styles
import './index.css';
import App from '@/App';
// import { registerSW } from 'virtual:pwa-register';

// registerSW({ immediate: true }); // auto update SW

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
