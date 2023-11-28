import React from 'react';
import { createRoot } from 'react-dom/client';
import CarouselStudio from './carouselStudio';

(() => {
    subscribe('sfcc:ready', ({ value }) => {
        const rootElement = document.createElement('div');
        document.body.append(rootElement);

        const root = createRoot(rootElement);
        root.render(<CarouselStudio data={value || {}} />);
    });
})();
