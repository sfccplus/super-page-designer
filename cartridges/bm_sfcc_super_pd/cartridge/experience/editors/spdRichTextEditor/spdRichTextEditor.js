'use strict';

const ContentMgr = require('dw/content/ContentMgr');
const Site = require('dw/system/Site');
const HTTPClient = require('dw/net/HTTPClient');
const URLUtils = require('dw/web/URLUtils');
const spdHelpers = require('*/cartridge/experience/utilities/spdHelpers.js');
const spdRichTextEditorHelpers = require('*/cartridge/scripts/experience/basic/spdRichTextEditorHelpers.js');

/**
 * Get the storefront global css file url
 * @param {string} url api url
 * @returns {string} css file url
*/
function getGlobalCssURL(url) {
    const httpClient = new HTTPClient();
    httpClient.open('GET', url);
    httpClient.setTimeout(3000);
    httpClient.send();

    return httpClient.text;
}

module.exports.init = function (editor) {
    const siteLibrary = ContentMgr.getSiteLibrary();

    const imageUploaderURL = URLUtils.url(
        'SPDImagesManager-Upload',
        'libraryId', siteLibrary.ID,
        'locale', 'default',
        'uploadPath', 'images/rich-text-editor'
    ).toString();

    const viewImageURL = spdHelpers.updateURLToStorefrontSite(
        URLUtils.url('SuperPD-ImageURL').toString()
    );

    const globalCssApiURL = spdHelpers.updateURLToStorefrontSite(
        URLUtils.url('SuperPD-GlobalCssURL').toString(),
        true
    );

    const globalCssURL = getGlobalCssURL(globalCssApiURL);
    const richTextEditorCss = URLUtils.httpsStatic(
        '/css/experience/editors/spdRichTextEditor.css'
    ).toString();

    const customFontFamilies = spdRichTextEditorHelpers.getFontFamilies();
    if (customFontFamilies) {
        editor.configuration.put('customFontFamilies', customFontFamilies);
    }

    const customFontSizes = spdRichTextEditorHelpers.getFontSizes();
    if (customFontSizes) {
        editor.configuration.put('customFontSizes', customFontSizes);
    }

    editor.configuration.put('siteHostname', Site.current.httpsHostName);
    editor.configuration.put('viewImageURL', viewImageURL);
    editor.configuration.put('imageUploaderURL', imageUploaderURL);
    editor.configuration.put('globalCssURL', globalCssURL);
    editor.configuration.put('richTextEditorCss', richTextEditorCss);
};
