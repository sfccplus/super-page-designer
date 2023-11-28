/**
 * Update a generated url from Sites-Site to storefront site
 * @param {string} url generated url
 * @returns {string} formatted url
 */
function updateURLToStorefrontSite(url, isAbsolute) {
    const Site = require('dw/system/Site');
    const currentSite = Site.current;
    const siteId = 'Sites-' + currentSite.ID + '-Site';

    if (isAbsolute) {
        return currentSite.httpsHostName + url.replace('Sites-Site', siteId);
    }
    return url.replace('Sites-Site', siteId);
}

/**
 * Returns Images View URL
 * @returns {string} images view url
 */
function getImagesViewURL() {
    var URLUtils = require('dw/web/URLUtils');

    const controllerURL = updateURLToStorefrontSite(
        URLUtils.url('SuperPD-ImageURL').toString()
    );

    return controllerURL + '?imagePath=';
}

module.exports = {
    updateURLToStorefrontSite: updateURLToStorefrontSite,
    getImagesViewURL: getImagesViewURL,
};
