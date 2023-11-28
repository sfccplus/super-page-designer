import React, { useState, useEffect } from 'react';
import RangeSlider from 'react-range-slider-input';
import { useDispatch, useSelector } from 'react-redux';

import { setQuality } from '../redux/image-slice';

import styles from './images-editor.module.scss';
import 'react-range-slider-input/dist/style.css';

export default function ControlPanel() {
    const dispatch = useDispatch();
    const quality = useSelector((state) => state.image.quality);
    const [qualityInputState, setQualityInputState] = useState();

    useEffect(() => {
        setQualityInputState([0, quality]);
    }, [quality]);

    function handleQualityChange() {
        dispatch(setQuality(qualityInputState[1]));
    }

    return (
        <div className={styles.editorControls}>
            <div className={styles.qualityControl}>
                <label className="slds-form-element__label slds-m-bottom_x-small">
                    Quality
                </label>
                <RangeSlider
                    onThumbDragEnd={handleQualityChange}
                    onInput={setQualityInputState}
                    value={qualityInputState}
                    rangeSlideDisabled={true}
                    thumbsDisabled={[true, false]}
                    min={1}
                />
            </div>
        </div>
    );
}
