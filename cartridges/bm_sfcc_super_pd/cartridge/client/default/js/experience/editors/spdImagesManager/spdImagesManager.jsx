import React from 'react';
import { createRoot } from 'react-dom/client';
import { ImagePicker } from '@sfccplus/super-pd-core';

(() => {
    subscribe('sfcc:ready', ({ config }) => {
        window.EditorsContext = {
            urls: {
                getLibraryFoldersURL: config.getLibraryFoldersURL,
                getFolderImagesURL: config.getFolderImagesURL,
                viewImageURL: config.viewImageURL,
                imageUploaderURL: config.imageUploaderURL,
            },
        };

        const rootElement = document.createElement('div');
        document.body.append(rootElement);

        const root = createRoot(rootElement);
        root.render(<ImagePicker />);
    });
})();
