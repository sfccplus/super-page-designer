'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var Logger = require('dw/system/Logger');

/**
 * Render logic for the Super Richtext component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge (must be serializable). This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var ContentMgr = require('dw/content/ContentMgr');
    var model = modelIn || new HashMap();

    var content = context.content;
    var siteLibrary = ContentMgr.getSiteLibrary();

    var richTextString = content.textEditor ? content.textEditor.value : '';

    model.textEditor = richTextString;

    return new Template('experience/components/basic/spdRichTextComponent').render(model)
        .text;
};
