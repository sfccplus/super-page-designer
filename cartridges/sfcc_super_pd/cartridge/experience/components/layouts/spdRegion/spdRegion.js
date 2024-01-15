'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var Logger = require('dw/system/Logger');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for Super Region component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge (must be serializable). This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();

    var content = context.content;
    var component = context.component;
    var regionEditor = content.regionEditor.value;

    var regionClassName = 'spdlayout-region';

    if (regionEditor) {
        regionClassName += ' region-' + regionEditor.key;
    }

    var componentRenderSettings = context.componentRenderSettings;
    componentRenderSettings.setAttributes({
        class: regionClassName,
    });

    model.regionsCss = regionEditor ? regionEditor.regionRawCss : '';

    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/layouts/spdRegion').render(model).text;
};
