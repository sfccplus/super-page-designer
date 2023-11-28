var StringUtils = require('dw/util/StringUtils');
var spdPreferencesHelper = require('*/cartridge/scripts/helpers/spdPreferencesHelper.js');

function parseFonts(fontsJSON) {
    var fontKeys = Object.keys(fontsJSON);

    if (!fontKeys.length) return;

    return fontKeys.map(function (key) {
            return StringUtils.format('{0}={1};', key, fontsJSON[key]);
        }).join(' ');
}

function getFontFamilies() {
    try {
        var fontsJSON = JSON.parse(
            spdPreferencesHelper.getSitePreference('SPD_richTextFonts')
        );
        return parseFonts(fontsJSON);
    } catch (error) {
        return;
    }
}

function getFontSizes() {
    return spdPreferencesHelper.getSitePreference('SPD_richTextFontSizes') || '';
}

module.exports = {
    getFontFamilies: getFontFamilies,
    getFontSizes: getFontSizes,
};
