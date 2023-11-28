import { mapCssValues } from './cssBuilder';
import styleToCss from 'style-object-to-css-string';
import json2mq from 'json2mq';

/**
 * Css handler to build css from configuration
 * @param {Object} breakpointsConfig
 */
export default function CssHandler(breakpointsConfig) {
    this.breakpointsConfig = breakpointsConfig;
}

CssHandler.prototype.getCssBlock = function (cssSelector, config) {
    const cssObject = mapCssValues(config);
    const cssString = styleToCss(cssObject);

    if (!cssString) return '';

    return `${cssSelector} {\n${cssString}\n}\n`;
};

/**
 * Get formatted breakpoint block
 * @param {String} breakpoint breakpoint key
 * @param {String} cssBlock
 * @returns
 */
CssHandler.prototype.getBreakpointBlock = function (cssSelector, breakpoint, config) {
    const cssString = this.getCssBlock(cssSelector, config);

    if (!cssString) return '';

    if (breakpoint === 'default') {
        return cssString;
    }

    const mediaQuery = json2mq(this.breakpointsConfig[breakpoint]);
    return `@media ${mediaQuery} {\n${cssString}\n}\n`;
};

/**
 * Build raw css
 * @param {string} cssSelector Css selector for the provided config
 * @param {Object} config Configuration object
 * @returns {string} Css string
 */
CssHandler.prototype.getRawCss = function (cssSelector, config) {
    const breakpoints = ['default', 'mobile', 'tablet', 'desktop'];
    let rawCss = '';

    for (const breakpoint of breakpoints) {
        const breakpointConfig = config.breakpoints[breakpoint];
        rawCss += this.getBreakpointBlock(cssSelector, breakpoint, breakpointConfig);
    }

    return rawCss;
};
