import React, { useContext, useState } from 'react';
import { isNil } from 'lodash';

import { EditorContext } from '../../layoutEditorContext';
import { getRegionDefinition } from '../../utilities/regionsHandler';

import BreakPointSelector from 'library/molecules/breakpoint-selector/breakpoint-selector';
import FourDimensionSelector from 'library/molecules/four-dimension-selector/four-dimension-selector';
import ColorPicker from 'library/molecules/color-picker/color-picker';
import AlignmentSelector from 'library/molecules/alignment-selector/alignment-selector';
import BackgroundSettings from 'library/molecules/background-settings/background-settings';
import DimensionSelector from 'library/molecules/dimension-selector/dimension-selector';

export default function ContainerEditor({ container }) {
    const { dispatch } = useContext(EditorContext);
    const [currentBreakpoint, setCurrentBreakpoint] = useState('default');

    if (!container) {
        container = getRegionDefinition({});
    }

    function handleValueChange(propertyName, value) {
        container.breakpoints[currentBreakpoint][propertyName] = value;

        dispatch({
            type: 'updateContainer',
            value: container,
        });
    }

    function getPropertyValue(propertyName, defaultValue) {
        let value = container.breakpoints[currentBreakpoint][propertyName];

        if (isNil(value) && defaultValue) {
            value = defaultValue;
        }

        return value;
    }

    return (
        <>
            <BreakPointSelector
                value={currentBreakpoint}
                onChange={setCurrentBreakpoint}
            />
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
            <div className="slds-grid slds-m-bottom_small slds-grid_align-spread">
                <AlignmentSelector
                    name="Horizontal Alignment"
                    value={getPropertyValue('justifyContent')}
                    onChange={(value) => handleValueChange('justifyContent', value)}
                    direction="horizontal"
                />
                <AlignmentSelector
                    name="Vertical Alignment"
                    value={getPropertyValue('alignItems')}
                    onChange={(value) => handleValueChange('alignItems', value)}
                    direction="vertical"
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
                <FourDimensionSelector
                    name="Padding"
                    value={getPropertyValue('padding')}
                    onChange={(value) => handleValueChange('padding', value)}
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
                <BackgroundSettings
                    value={getPropertyValue}
                    onChange={handleValueChange}
                />
            </div>
        </>
    );
}
