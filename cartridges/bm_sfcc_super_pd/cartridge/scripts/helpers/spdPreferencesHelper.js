'use strict';

var Site = require('dw/system/Site');

function getSitePreference(key, defaultValue) {
    var sitePreferences = Site.getCurrent().getPreferences().getCustom();

    var value = sitePreferences[key];
    if (!value && defaultValue) {
        value = defaultValue;
    }

    return value;
}

function getJSONPreference(key, defaultValue) {
    var sitePreference = getSitePreference(key, defaultValue);

    try {
        return JSON.parse(sitePreference);
    } catch (error) {
        return null;
    }
}

module.exports = {
    getSitePreference: getSitePreference,
    getJSONPreference: getJSONPreference,
};
