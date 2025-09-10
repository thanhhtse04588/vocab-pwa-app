import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// App styles
import './index.css';
import App from '@/App';
// import { registerSW } from 'virtual:pwa-register';

// registerSW({ immediate: true }); // auto update SW

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
