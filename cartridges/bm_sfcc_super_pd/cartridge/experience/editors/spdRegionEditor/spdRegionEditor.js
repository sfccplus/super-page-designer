'use strict';

const spdLayoutHelpers = require('*/cartridge/scripts/experience/layout/spdLayoutHelpers.js');

module.exports.init = function (editor) {
    const breakpointsConfig = spdLayoutHelpers.getBreakpointsConfiguration();
    if (breakpointsConfig) {
        editor.configuration.put('breakpointsConfig', breakpointsConfig);
    }
};
