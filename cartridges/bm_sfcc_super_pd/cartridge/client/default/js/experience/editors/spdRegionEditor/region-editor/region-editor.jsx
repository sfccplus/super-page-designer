import React from 'react';
import { isNil } from 'lodash';

import DimensionSelector from 'library/molecules/dimension-selector/dimension-selector';
import FourDimensionSelector from 'library/molecules/four-dimension-selector/four-dimension-selector';
import ColorPicker from 'library/molecules/color-picker/color-picker';
import BreakPointSelector from 'library/molecules/breakpoint-selector/breakpoint-selector';

import styles from './region-editor.module.scss';
import NumberInput from 'library/atoms/numberInput/numberInput';
import BackgroundSettings from 'library/molecules/background-settings/background-settings';

export default function RegionEditor({
    region,
    breakpoint,
    onChange,
    onBreakpointChange,
}) {
    function getPropertyValue(propertyName, defaultValue) {
        if (!region) return;

        let value = region.breakpoints[breakpoint][propertyName];

        if (isNil(value) && defaultValue) {
            value = defaultValue;
        }

        return value;
    }

    function handleValueChange(propertyName, value) {
        onChange(propertyName, value);
    }

    if (!region) return <></>;

    return (
        <div className={`${styles.regionEditor}`}>
            <BreakPointSelector value={breakpoint} onChange={onBreakpointChange} />
            <div className="slds-grid slds-m-bottom_small">
                <DimensionSelector
                    name="Width"
                    className="slds-m-right_x-small"
                    measurement={getPropertyValue('width')}
                    onChange={(value) => handleValueChange('width', value)}
                />
                <DimensionSelector
                    name="Height"
                    measurement={getPropertyValue('height')}
                    onChange={(value) => handleValueChange('height', value)}
                />
            </div>
            <div className="slds-m-bottom_small">
                <FourDimensionSelector
                    name="Padding"
                    value={getPropertyValue('padding')}
                    onChange={(value) => handleValueChange('padding', value)}
                />
            </div>
            <div className="slds-m-bottom_small">
                <FourDimensionSelector
                    name="Margin"
                    value={getPropertyValue('margin')}
                    onChange={(value) => handleValueChange('margin', value)}
                />
            </div>
            <div className="slds-m-bottom_small">
                <ColorPicker
                    name="Text Color"
                    value={getPropertyValue('color')}
                    onChange={(value) => handleValueChange('color', value)}
                />
            </div>
            <div className="slds-m-bottom_small">
                <ColorPicker
                    name="Background Color"
                    value={getPropertyValue('backgroundColor')}
                    onChange={(value) => handleValueChange('backgroundColor', value)}
                />
            </div>
            <div className="slds-m-bottom_small">
                <FourDimensionSelector
                    name="Border Radius"
                    value={getPropertyValue('borderRadius')}
                    onChange={(value) => handleValueChange('borderRadius', value)}
                />
            </div>
            <BackgroundSettings value={getPropertyValue} onChange={handleValueChange} />
            <div className="slds-m-bottom_small">
                <NumberInput
                    name="Order"
                    onChange={(value) => handleValueChange('order', value)}
                    value={getPropertyValue('order')}
                />
            </div>
        </div>
    );
}
