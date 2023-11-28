'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var Logger = require('dw/system/Logger');
var spdConstants = require('*/cartridge/scripts/spdConstants.js');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

function getBreakPointsConfig() {
    var Site = require('dw/system/Site');
    var sitePreferences = Site.getCurrent().getPreferences().getCustom();

    let breakpointsConfig;
    try {
        breakpointsConfig = JSON.parse(sitePreferences['SPD_breakpoints']);
    } catch (error) {
        breakpointsConfig = null;
    }

    return breakpointsConfig || spdConstants.DEFAULT_BREAKPOINTS;
}

/**
 * Render logic for the Super Carousel component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var component = context.component;
    var content = context.content;

    var swiperConfig = content.carouselEditor ? content.carouselEditor.value : null;
    var breakpointsConfig = getBreakPointsConfig();

    try {
        swiperConfig = JSON.parse(swiperConfig);
        if (swiperConfig) {
            for (var breakpointKey of ['tablet', 'desktop']) {
                var breakpointConfig = swiperConfig.breakpoints;
                if (Object.keys(breakpointConfig[breakpointKey]).length) {
                    Object.defineProperty(
                        breakpointConfig,
                        breakpointsConfig[breakpointKey].minWidth,
                        Object.getOwnPropertyDescriptor(breakpointConfig, breakpointKey)
                    );
                }
                delete breakpointConfig[breakpointKey];
            }
        }
        model.swiperconfig = JSON.stringify(swiperConfig);
        model.regions = PageRenderHelper.getRegionModelRegistry(component);
    } catch (error) {
        Logger.warn('Super Carousel failed to load: {0}', error.toString());
    }

    // instruct 24 hours relative pagecache
    var expires = new Date();
    expires.setDate(expires.getDate() + 1); // this handles overflow automatically
    response.setExpires(expires);

    return new Template('experience/components/layouts/spdCarousel').render(model).text;
};
