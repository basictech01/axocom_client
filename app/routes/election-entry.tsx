import React from 'react';
import { createRoot } from 'react-dom/client';
import ElectionPage from './election-page';
import '../app.css';

const container = document.getElementById('election-root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <ElectionPage />
        </React.StrictMode>
    );
}