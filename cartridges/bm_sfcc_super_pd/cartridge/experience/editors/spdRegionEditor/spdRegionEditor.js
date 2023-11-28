'use strict';

var HashMap = require('dw/util/HashMap');
var PageMgr = require('dw/experience/PageMgr');

const spdLayoutHelpers = require('*/cartridge/scripts/experience/layout/spdLayoutHelpers.js');

module.exports.init = function (editor) {
    const breakpointsConfig = spdLayoutHelpers.getBreakpointsConfiguration();
    if (breakpointsConfig) {
        editor.configuration.put('breakpointsConfig', breakpointsConfig);
    }

    // Add Images Manager as Dependency
    var breakoutEditorConfig = new HashMap();
    var breakoutEditor = PageMgr.getCustomEditor(
        'spdImagesManager.spdImagesManager',
        breakoutEditorConfig
    );
    editor.dependencies.put('spdImagesManager', breakoutEditor);
};
