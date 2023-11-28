import React from 'react';
import styles from './border-configurator.module.scss';
import ColorPicker from '../color-picker/color-picker';
import DimensionSelector from '../dimension-selector/dimension-selector';
import FourDimensionSelector from '../four-dimension-selector/four-dimension-selector';

const DEFAULT_VALUE = {
    color: 'rgba(0, 0, 0, 1)',
    width: {
        top: { value: 0, unit: 'px' },
        right: { value: 0, unit: 'px' },
        bottom: { value: 0, unit: 'px' },
        left: { value: 0, unit: 'px' },
    },
    style: 'solid',
    radius: { value: 0, unit: 'px' },
};

export default function BorderConfigurator({ name, value = DEFAULT_VALUE, onChange }) {
    function handleChange(property, newValue) {
        const updatedConfig = {
            ...value,
            [property]: newValue,
        };
        onChange(updatedConfig);
    }

    return (
        <div className={styles.editorContainer}>
            <h5>{name}</h5>
            <ColorPicker
                pickerPosition="bottom"
                name="Border Color"
                value={value.color}
                onChange={(value) => handleChange('color', value)}
            />
            <FourDimensionSelector
                value={value.width}
                name="Border Width"
                onChange={(value) => handleChange('width', value)}
            />
            <DimensionSelector
                measurement={value.radius}
                name="Border Radius"
                onChange={(value) => handleChange('radius', value)}
            />
        </div>
    );
}
