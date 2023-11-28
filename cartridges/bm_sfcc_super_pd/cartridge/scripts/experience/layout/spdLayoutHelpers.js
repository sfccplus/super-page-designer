const spdPreferencesHelper = require('*/cartridge/scripts/helpers/spdPreferencesHelper.js');

const DEFAULT_BREAKPOINTS = {
    mobile: {
        maxWidth: 767.99,
    },
    tablet: {
        minWidth: 768,
        maxWidth: 1023.99,
    },
    desktop: {
        minWidth: 1024,
    },
};

/**
 * Get breakpoints configuration
 * @returns {Object} Breakpoints Configuration
 */
function getBreakpointsConfiguration() {
    const breakpointsConfig = spdPreferencesHelper.getJSONPreference('SPD_breakpoints');
    return breakpointsConfig || DEFAULT_BREAKPOINTS;
}

module.exports = {
    getBreakpointsConfiguration: getBreakpointsConfiguration,
};
