import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setEditorPage, toggleEditor } from '../../redux/manager-slice';
import { resetImage, saveCropData, setTempCropData } from '../../redux/image-slice';

import styles from './img-editor-header.module.scss';

export default function ImgEditorHeader() {
    const dispatch = useDispatch();
    const currentEditorPage = useSelector((state) => state.manager.currentEditorPage);

    function handleActions(action) {
        switch (action) {
            case 'crop':
                dispatch(setEditorPage('crop'));
                break;
            case 'cancel':
                dispatch(setTempCropData());
                dispatch(setEditorPage('home'));
                break;
            case 'save':
                dispatch(saveCropData());
                dispatch(setEditorPage('home'));
                break;
            case 'back':
                dispatch(resetImage());
                dispatch(setEditorPage('home'));
                dispatch(toggleEditor());
                break;
            case 'reset':
                dispatch(resetImage());
                break;
            default:
                break;
        }
    }

    function isCropPage() {
        return currentEditorPage === 'crop';
    }

    return (
        <div className={styles.editorHeader}>
            <div className={styles.editorTitle}>
                <i
                    onClick={() => handleActions('back')}
                    className={`${styles.backButton} fas fa-arrow-left`}
                ></i>
                Super Page Designer
            </div>
            <div className={styles.editorActions}>
                {!isCropPage() && (
                    <>
                        <button
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => handleActions('reset')}
                            className="slds-button slds-button_destructive"
                        >
                            <i className="fas fa-undo slds-button__icon slds-button__icon_left"></i>
                            Reset
                        </button>
                        <button
                            onClick={() => handleActions('crop')}
                            className={`${styles.primaryButton} slds-button slds-button_brand`}
                        >
                            <i className="fas fa-crop"></i>
                            Crop
                        </button>
                    </>
                )}
                {isCropPage() && (
                    <>
                        <button
                            onClick={() => handleActions('cancel')}
                            className="slds-button slds-button_neutral"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleActions('save')}
                            className={`${styles.primaryButton} slds-button slds-button_brand`}
                        >
                            Save
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
