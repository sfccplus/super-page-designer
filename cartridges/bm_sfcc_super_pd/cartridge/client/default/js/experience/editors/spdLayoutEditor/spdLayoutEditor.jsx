import React from 'react';
import { createRoot } from 'react-dom/client';
import { LayoutEditor } from '@sfccplus/super-pd-core';

(() => {
    subscribe('sfcc:ready', ({ value = {}, config }) => {
        const rootElement = document.createElement('div');
        document.body.append(rootElement);

        const root = createRoot(rootElement);
        root.render(
            <LayoutEditor value={value} breakpointsConfig={config.breakpointsConfig} />,
        );
    });
})();
