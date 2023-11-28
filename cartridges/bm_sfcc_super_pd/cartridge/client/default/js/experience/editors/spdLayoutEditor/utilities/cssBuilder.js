import { cloneDeep, isNil } from 'lodash';
import { getMeasurementValue, getMeasurementsValue } from './cssHelpers';

function deleteProperty(object, propertyName) {
    delete object[propertyName];

    if (propertyName === 'width') {
        delete object['flex'];
    }
}

/**
 * Map config css values
 * @param {Object} cssProperties
 * @returns {Object} formatted css string
 */
export function mapCssValues(cssProperties) {
    const cssPropertiesCopy = cloneDeep(cssProperties);
    let propertyValue;
    for (const cssProperty in cssPropertiesCopy) {
        propertyValue = cssPropertiesCopy[cssProperty];

        if (isNil(propertyValue)) {
            deleteProperty(cssPropertiesCopy, cssProperty);
            continue;
        }

        switch (cssProperty) {
            case 'width':
                propertyValue = getMeasurementValue(propertyValue);
                cssPropertiesCopy.flex = `0 0 ${propertyValue}`;
                break;
            case 'height':
                propertyValue = getMeasurementValue(propertyValue);
                break;

            case 'padding':
            case 'margin':
            case 'borderRadius':
                propertyValue = getMeasurementsValue(propertyValue);
                break;
            case 'backgroundImage':
                propertyValue = `url("${propertyValue}")`;
                break;
            case 'backgroundRepeat':
                propertyValue = propertyValue ? 'repeat' : 'no-repeat';
                break;

            default:
                break;
        }

        if (!propertyValue) {
            deleteProperty(cssPropertiesCopy, cssProperty);
            continue;
        }

        cssPropertiesCopy[cssProperty] = propertyValue;
    }

    return cssPropertiesCopy;
}
