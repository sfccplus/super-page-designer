import React, { useState } from 'react';
import { clone } from 'lodash';

import DimensionSelector from '../dimension-selector/dimension-selector';
import styles from './four-dimension-selector.module.scss';

function getDefaultMeasurements() {
    let defaultMeasurement = { value: '', unit: 'px' };

    return {
        top: clone(defaultMeasurement),
        right: clone(defaultMeasurement),
        bottom: clone(defaultMeasurement),
        left: clone(defaultMeasurement),
    };
}

function isMeasurementsEqual(measurements) {
    let result = true;
    let i = 1;

    const measurementsArray = Object.values(measurements);
    do {
        result &&=
            measurementsArray[0].value === measurementsArray[i].value &&
            measurementsArray[0].unit === measurementsArray[i].unit;
    } while (++i < measurementsArray.length && result);

    return result;
}

export default function FourDimensionSelector({
    name,
    onChange,
    value = getDefaultMeasurements()
}) {
    const [fourDimensionMode, setFourDimensionMode] = useState(
        !isMeasurementsEqual(value)
    );

    function toggleFourDimensionMode() {
        setFourDimensionMode(!fourDimensionMode);
    }

    function handleValueChange(direction, measurement) {
        if (!fourDimensionMode) {
            ['top', 'right', 'bottom', 'left'].forEach(
                (direction) => (value[direction] = clone(measurement)),
            );
        } else {
            value[direction] = measurement;
        }

        if (onChange) {
            onChange(value);
        }
    }

    const inputsBlock = (
        <>
            <div className="slds-col slds-m-right_x-small">
                <DimensionSelector
                    name="Top"
                    measurement={value.top}
                    inputOnly={true}
                    onChange={(value) => handleValueChange('top', value)}
                />
            </div>
            <div className="slds-col slds-m-right_x-small">
                <DimensionSelector
                    name="Right"
                    measurement={value.right}
                    inputOnly={true}
                    onChange={(value) => handleValueChange('right', value)}
                />
            </div>
            <div className="slds-col slds-m-right_x-small">
                <DimensionSelector
                    name="Bottom"
                    measurement={value.bottom}
                    inputOnly={true}
                    onChange={(value) => handleValueChange('bottom', value)}
                />
            </div>
            <div className="slds-col">
                <DimensionSelector
                    name="Left"
                    measurement={value.left}
                    inputOnly={true}
                    onChange={(value) => handleValueChange('left', value)}
                />
            </div>
        </>
    );

    return (
        <div className="slds-form-element">
            {name && <label className="slds-form-element__label">{name}</label>}
            <div className="slds-form-element__control slds-grid slds-grid_vertical-align-center">
                <div
                    className={`${styles.lockIcon} slds-p-right_x-small slds-p-left_xx-small`}
                    onClick={() => toggleFourDimensionMode()}
                >
                    <i
                        className={`fas ${fourDimensionMode ? 'fa-unlock' : 'fa-lock'}`}
                    ></i>
                </div>
                {inputsBlock}
            </div>
        </div>
    );
}
