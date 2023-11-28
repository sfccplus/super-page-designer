'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');

/**
 * This controller returns images paths inside the current site library
 */
server.get('ImageURL', function (req, res, next) {
    const siteLibrary = dw.content.ContentMgr.getSiteLibrary();

    const transformationObject = {};

    const querystring = req.querystring;
    if (querystring.cropX) {
        transformationObject.cropX = +querystring.cropX;
        transformationObject.cropY = +querystring.cropY;
        transformationObject.cropWidth = +querystring.cropWidth;
        transformationObject.cropHeight = +querystring.cropHeight;
    }

    if (querystring.quality) {
        transformationObject.quality = +querystring.quality;
    }

    if (querystring.width) {
        transformationObject.scaleWidth = +querystring.width;
    }

    if (querystring.height) {
        transformationObject.scaleHeight = +querystring.height;
    }

    var libraryUrl = URLUtils.imageURL(
        URLUtils.CONTEXT_LIBRARY,
        siteLibrary.ID,
        req.querystring.imagePath,
        transformationObject
    ).toString();

    res.redirect(libraryUrl);
    next();
});

/**
 * This controller returns the global css file url
 * to be used in custom business manager editors, pages...
 */
server.get('GlobalCssURL', function (req, res, next) {
    res.print(URLUtils.httpsStatic('/css/global.css'));
    next();
});

module.exports = server.exports();
