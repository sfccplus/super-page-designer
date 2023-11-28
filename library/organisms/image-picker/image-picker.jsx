import React from 'react';
import { useSelector } from 'react-redux';
import useResizeObserver from 'use-resize-observer';

import styles from './image-picker.module.scss';
import ImagesList from './images-list/images-list';
import ImagesEditor from './images-editor/images-editor';
import LeftPanel from './left-panel/left-panel';

export default function ImagePicker() {
    const { ref, height } = useResizeObserver();
    const isEditorActive = useSelector((state) => state.manager.isEditorActive);
    const currentFolder = useSelector((state) => state.manager.currentFolder);
    const currentImagePath = useSelector((state) => state.image.path);

    return (
        <>
            {isEditorActive && <ImagesEditor currentImagePath={currentImagePath} />}
            <div className={styles.rightPanel}>
                <ImagesList currentFolder={currentFolder} />
            </div>
            <div className={styles.leftPanel} ref={ref}>
                <LeftPanel height={height} currentFolder={currentFolder} />
            </div>
        </>
    );
}
