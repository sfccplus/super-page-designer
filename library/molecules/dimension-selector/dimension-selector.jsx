import React from 'react';
import styles from './dimension-selector.module.scss';

export default function DimensionSelector({
    name,
    measurement = { value: '', unit: 'px' },
    onChange,
    className,
    inputOnly = false,
    readOnly = false
}) {
    function handleUnitChange(event) {
        measurement.unit = event.target.value;

        if (onChange) {
            onChange(measurement);
        }
    }

    function handleValueChange(event) {
        measurement.value = event.target.value;

        if (onChange) {
            onChange(measurement);
        }
    }

    return (
        <div className={`slds-form-element ${className || ''}`}>
            {!inputOnly && (
                <label className="slds-form-element__label" htmlFor={name}>
                    {name}
                </label>
            )}
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    id={name}
                    value={measurement.value}
                    placeholder={name}
                    autoComplete="off"
                    onChange={handleValueChange}
                    readOnly={readOnly}
                />
                <select
                    value={measurement.unit}
                    onChange={handleUnitChange}
                    disabled={readOnly}
                >
                    <option value="px">px</option>
                    <option value="%">%</option>
                    <option value="vh">vh</option>
                    <option value="vw">vw</option>
                    {/* <option value="auto">auto</option> */}
                </select>
            </div>
        </div>
    );
}
