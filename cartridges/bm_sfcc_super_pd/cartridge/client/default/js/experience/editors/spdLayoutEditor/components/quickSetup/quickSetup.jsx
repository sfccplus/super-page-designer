import React, { useContext, useState } from 'react';
import styles from './quick-setup.module.scss';
import { EditorContext } from '../../layoutEditorContext';

import ColorPicker from 'library/molecules/color-picker/color-picker';

export default function RegionsCountEditor() {
    const { dispatch } = useContext(EditorContext);
    const [textColor, setTextColor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');

    function saveChanges() {
        dispatch({
            type: 'initialSetup',
            value: {
                color: textColor,
                backgroundColor: backgroundColor,
            },
        });
    }

    return (
        <div className={styles.countEditor}>
            <h1 className={styles.title}>Initial Setup</h1>
            <div className="slds-m-bottom_xx-small">
                <ColorPicker
                    name="Set the default text color"
                    pickerPosition="bottom"
                    value={textColor}
                    onChange={setTextColor}
                />
            </div>
            <div className="slds-m-bottom_xx-small">
                <ColorPicker
                    name="Set the default background color"
                    pickerPosition="bottom"
                    value={backgroundColor}
                    onChange={setBackgroundColor}
                />
            </div>
            <div className={`${styles.actionBlock} slds-text-align_right`}>
                <button
                    className="slds-button slds-button_brand slds-m-top_xx-small"
                    onClick={saveChanges}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
