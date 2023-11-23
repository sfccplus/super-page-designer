import React from 'react';

export default function Picklist({ name, value, onChange, options = [] }) {
    const optionsElements = options.map((option) => {
        return (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        );
    });

    function handleValueChange(event) {
        onChange(event.target.value);
    }

    return (
        <div className={`slds-form-element`}>
            <label className="slds-form-element__label">{name}</label>
            <div className="slds-form-element__control slds-grid">
                <select
                    onChange={handleValueChange}
                    value={value}
                    className="slds-input"
                    id=""
                >
                    <option value="" disabled>{name}</option>
                    {optionsElements}
                </select>
            </div>
        </div>
    );
}
