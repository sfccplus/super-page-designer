import React from 'react';
import { createRoot } from 'react-dom/client';
import { CarouselEditor } from '@sfccplus/super-pd-core';

(() => {
    subscribe('sfcc:ready', ({ value }) => {
        const rootElement = document.createElement('div');
        document.body.append(rootElement);

        const root = createRoot(rootElement);
        root.render(<CarouselEditor value={value} />);
    });
})();
