import React from 'react';
import { createRoot } from 'react-dom/client';
import { RegionEditor } from '@sfccplus/super-pd-core';

(() => {
    subscribe('sfcc:ready', ({ value = {}, config }) => {
        const rootElement = document.createElement('div');
        document.body.append(rootElement);

        const root = createRoot(rootElement);
        root.render(
            <RegionEditor value={value} breakpointsConfig={config.breakpointsConfig} />,
        );
    });
})();
