'use strict';

var HashMap = require('dw/util/HashMap');
var PageMgr = require('dw/experience/PageMgr');

module.exports.init = function (editor) {
    // Add Images Manager as Dependency
    var breakoutEditorConfig = new HashMap();
    var breakoutEditor = PageMgr.getCustomEditor(
        'spdImagesManager.spdImagesManager',
        breakoutEditorConfig
    );
    editor.dependencies.put('spdImagesManager', breakoutEditor);
};
