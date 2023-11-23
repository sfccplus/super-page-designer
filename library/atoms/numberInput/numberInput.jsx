import React, { useState } from 'react';

export default function NumberInput({ name, value, onChange, hideLabel }) {
    const [isInputValid, setIsInputValid] = useState(true);

    function handleChange(event) {
        const target = event.target;
        setIsInputValid(target.validity.valid);

        onChange(target.value, target.validity.valid);
    }

    return (
        <div className={`slds-form-element ${!isInputValid ? 'slds-has-error' : ''}`}>
            {!hideLabel && <label className="slds-form-element__label"> {name}</label>}
            <div className="slds-form-element__control">
                <input
                    type="text"
                    id={name}
                    placeholder={name}
                    autoComplete="off"
                    className="slds-input"
                    pattern="^\d+(\.\d+)?$"
                    onChange={handleChange}
                    value={value}
                />
            </div>
            {!isInputValid && (
                <div className="slds-form-element__help">Enter a valid value.</div>
            )}
        </div>
    );
}
