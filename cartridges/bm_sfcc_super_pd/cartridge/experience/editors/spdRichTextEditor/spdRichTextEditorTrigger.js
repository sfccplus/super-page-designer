'use strict';

var HashMap = require('dw/util/HashMap');
var PageMgr = require('dw/experience/PageMgr');

module.exports.init = function (editor) {
    // Create a configuration for a custom editor to be displayed in a modal breakout dialog (breakout editor)
    var breakoutEditorConfig = new HashMap();

    // Add a dependency to the configured breakout editor
    var breakoutEditor = PageMgr.getCustomEditor(
        'spdRichTextEditor.spdRichTextEditor',
        breakoutEditorConfig
    );
    editor.dependencies.put('richTextEditor', breakoutEditor);
};
