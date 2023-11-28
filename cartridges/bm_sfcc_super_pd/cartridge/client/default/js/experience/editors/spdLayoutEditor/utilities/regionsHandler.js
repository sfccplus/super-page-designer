export function getRegionDefinition(options) {
    function getPropertiesObject(options, deviceOption) {
        deviceOption = deviceOption || {};

        return {
            display: options.display || undefined,
            order: deviceOption.order || options.order || undefined,
            width: deviceOption.width || options.width || undefined,
            height: deviceOption.height || options.height || undefined,
            color: deviceOption.color || options.color || undefined,
            padding: deviceOption.padding || options.padding || undefined,
            flexDirection:
                deviceOption.flexDirection || options.flexDirection || undefined,
            backgroundColor:
                deviceOption.backgroundColor || options.backgroundColor || undefined,
        };
    }

    return {
        key: options.key || '',
        breakpoints: {
            default: getPropertiesObject(options),
            mobile: getPropertiesObject(options, options.mobile),
            tablet: getPropertiesObject(options),
            desktop: getPropertiesObject(options),
        },
    };
}

export function getInitialContainerDefinition(initialSetupOptions) {
    return getRegionDefinition({
        color: initialSetupOptions.color,
        backgroundColor: initialSetupOptions.backgroundColor,
        flexDirection: initialSetupOptions.flexDirection,
    });
}
