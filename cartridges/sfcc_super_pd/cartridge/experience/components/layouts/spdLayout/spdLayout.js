'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var Logger = require('dw/system/Logger');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for Super Layout component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge (must be serializable). This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var ContentMgr = require('dw/content/ContentMgr');
    var model = modelIn || new HashMap();

    var content = context.content;

    var layoutEditor = content.layoutEditor.value;

    var editorRegions = layoutEditor.regions;

    var component = context.component;
    var regions = PageRenderHelper.getRegionModelRegistry(component);

    model.cssSelector = 'layout-' + layoutEditor.key;
    model.regionsCss = layoutEditor.regionsRawCss;
    model.containerCss = layoutEditor.containerRawCss;

    model.regions = regions;
    return new Template('experience/components/layouts/spdLayout').render(model).text;
};
