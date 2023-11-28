import React from 'react';
import { useSelector } from 'react-redux';

import ControlPanel from './control-panel';
import ImageCrop from './image-crop/image-crop';
import ImgEditorHeader from './img-editor-header/img-editor-header';
import imgManagerHelpers from '../img-manager-helpers';

import styles from './images-editor.module.scss';

export default function ImagesEditor({ currentImagePath }) {
    const currentEditorPage = useSelector((state) => state.manager.currentEditorPage);
    const cropData = useSelector((state) => state.image.cropData);
    const quality = useSelector((state) => state.image.quality);

    const finalURL = imgManagerHelpers.getFinalURL(currentImagePath, cropData, quality);

    return (
        <div className={styles.imagesEditorContainer}>
            <ImgEditorHeader />
            <div className={styles.editorLayout}>
                <div className={styles.editorPreview}>
                    {currentEditorPage == 'crop' && (
                        <ImageCrop imagePath={currentImagePath} />
                    )}
                    {currentEditorPage == 'home' && (
                        <div
                            className={styles.imagePreview}
                            style={{
                                backgroundImage: `url("${finalURL}")`,
                            }}
                        ></div>
                    )}
                </div>
                {currentEditorPage == 'home' && (
                    <ControlPanel currentTab={currentEditorPage} />
                )}
            </div>
        </div>
    );
}
