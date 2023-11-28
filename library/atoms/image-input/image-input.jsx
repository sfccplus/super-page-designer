import React from 'react';
import styles from './image-input.module.scss';

export default function ImageInput({ name, value, onChange, hideLabel }) {
    function handleBreakoutClose({ type, value }) {
        if (type === 'sfcc:breakoutApply') {
            onChange(value);
        }
    }

    function handleBreakoutOpen() {
        emit(
            {
                type: 'sfcc:breakout',
                payload: {
                    id: 'spdImagesManager',
                    title: 'Select an Image',
                },
            },
            handleBreakoutClose
        );
    }

    // Reduce image quality for preview
    const previewURL = value ? value + '&width=230' : '';

    return (
        <div className="slds-form-element">
            {!hideLabel && <label className="slds-form-element__label">{name}</label>}

            <div className={styles.imageInputContainer}>
                <div
                    className={styles.imageContainer}
                    style={{
                        ...(previewURL ? { backgroundImage: `url("${previewURL}")` } : {}),
                    }}
                ></div>
                <div className={styles.actionsContainer}>
                    {previewURL && (
                        <button
                            onClick={() => onChange('')}
                            className="slds-button slds-button_icon slds-button_icon-error slds-button_icon-border-filled"
                        >
                            <i className="fas fa-trash-alt slds-button__icon"></i>
                            <span className="slds-assistive-text">Delete</span>
                        </button>
                    )}
                    <button
                        onClick={handleBreakoutOpen}
                        className="slds-button slds-button_icon slds-button_icon-border-filled"
                    >
                        <i className="fas fa-folder-open slds-button__icon"></i>
                        <span className="slds-assistive-text">Open</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
