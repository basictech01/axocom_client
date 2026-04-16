import React from 'react';
import { createRoot } from 'react-dom/client';
import Careers from './careers';
import '../app.css';

const container = document.getElementById('careers-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Careers />
    </React.StrictMode>
  );
}