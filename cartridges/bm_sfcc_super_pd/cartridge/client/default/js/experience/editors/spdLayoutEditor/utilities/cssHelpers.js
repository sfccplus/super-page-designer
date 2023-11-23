export function isMeasurementsEqual(measurements) {
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

export function getMeasurementValue(measurement, defaultValue) {
    if (!measurement.value || measurement.value == 0) {
        return defaultValue || null;
    }
    return measurement.value + measurement.unit;
}

export function getMeasurementsValue(measurements) {
    if (!measurements) return null;

    if (isMeasurementsEqual(measurements)) {
        return getMeasurementValue(measurements.top);
    }

    const top = getMeasurementValue(measurements.top, '0px');
    const right = getMeasurementValue(measurements.right, '0px');
    const bottom = getMeasurementValue(measurements.bottom, '0px');
    const left = getMeasurementValue(measurements.left, '0px');

    return `${top} ${right} ${bottom} ${left}`;
}
