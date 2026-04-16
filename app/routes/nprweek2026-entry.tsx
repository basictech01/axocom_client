import React from 'react';
import { createRoot } from 'react-dom/client';
import NPRWeek2026 from './nprweek2026';
import '../app.css';

const container = document.getElementById('nprweek-root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <NPRWeek2026 />
        </React.StrictMode>
    );
}