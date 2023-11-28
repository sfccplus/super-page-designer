'use strict';

const ContentMgr = require('dw/content/ContentMgr');
const Site = require('dw/system/Site');
const HTTPClient = require('dw/net/HTTPClient');
const URLUtils = require('dw/web/URLUtils');
const spdHelpers = require('*/cartridge/experience/utilities/spdHelpers.js');

module.exports.init = function (editor) {
    const viewImageURL = spdHelpers.getImagesViewURL();
    editor.configuration.put('viewImageURL', viewImageURL);

    const siteLibrary = ContentMgr.getSiteLibrary();

    const imageUploaderURL = URLUtils.url(
        'SPDImagesManager-Upload',
        'libraryId', siteLibrary.ID
    ).toString();
    editor.configuration.put('imageUploaderURL', imageUploaderURL);

    const getLibraryFoldersURL = URLUtils.url(
        'SPDImagesManager-GetLibraryFolders',
        'libraryId',
        siteLibrary.ID
    ).toString();
    editor.configuration.put('getLibraryFoldersURL', getLibraryFoldersURL);

    const getFolderImagesURL = URLUtils.url(
        'SPDImagesManager-GetFolderImages',
        'libraryId',
        siteLibrary.ID
    ).toString();
    editor.configuration.put('getFolderImagesURL', getFolderImagesURL);
};
