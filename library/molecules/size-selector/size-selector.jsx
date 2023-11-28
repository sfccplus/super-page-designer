import React from 'react';
import DimensionSelector from '../dimension-selector/dimension-selector';

const DEFAULT_VALUE = {
    height: { value: 100, unit: 'px' },
    width: { value: 200, unit: 'px' },
};

export default function SizeSelector({ value = DEFAULT_VALUE, onChange }) {
    function handleChange(property, newValue) {
        const updatedValue = {
            ...value,
            [property]: newValue,
        };
        onChange(updatedValue);
    }

    return (
        <div className="slds-grid slds-gutters">
            <div className="slds-col">
                <DimensionSelector
                    name="Height"
                    measurement={value.height}
                    onChange={(value) => handleChange('height', value)}
                />
            </div>
            <div className="slds-col">
                <DimensionSelector
                    name="Width"
                    measurement={value.width}
                    onChange={(value) => handleChange('width', value)}
                />
            </div>
        </div>
    );
}
