import React from 'react';
import { createRoot } from 'react-dom/client';
import ImagePickerRoot from 'library/organisms/image-picker/image-picker-root';

window.changeValidationState = (valid) => {
    emit({
        type: 'sfcc:valid',
        payload: {
            valid: valid,
        },
    });
};

window.publishState = (payload) => {
    emit({
        type: 'sfcc:value',
        payload: payload,
    });
};

(() => {
    subscribe('sfcc:ready', ({ config }) => {
        window.getLibraryFoldersURL = config.getLibraryFoldersURL;
        window.getFolderImagesURL = config.getFolderImagesURL;
        window.viewImageURL = config.viewImageURL;
        window.imageUploaderURL = config.imageUploaderURL;

        const rootElement = document.createElement('div');
        document.body.append(rootElement);

        const root = createRoot(rootElement);
        root.render(<ImagePickerRoot />);
    });
})();
