import React, { useRef } from 'react';

import FoldersTree from '../folders-tree/folders-tree';
import { useUploadImageMutation } from '../redux/images-manager-client';
import LoadingSpinner from 'library/atoms/loading-spinner/loading-spinner';

import styles from './left-panel.module.scss';

export default function LeftPanel({ height, currentFolder }) {
    const uploadFormRef = useRef(null);
    const [updatePost, { isLoading }] = useUploadImageMutation();

    function handleFileChange() {
        const formData = new FormData(uploadFormRef.current);

        updatePost({
            folderPath: currentFolder,
            data: formData,
        });
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <div className={styles.uploadContainer}>
                <label className="slds-button slds-button_neutral slds-button_stretch">
                    Upload Image
                    <form method="post" encType="multipart/form-data" ref={uploadFormRef}>
                        <input
                            onChange={handleFileChange}
                            accept="image/*"
                            type="file"
                            name="file"
                            hidden
                        />
                    </form>
                </label>
            </div>
            <FoldersTree height={height} currentFolder={currentFolder} />
        </>
    );
}
