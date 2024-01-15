'use strict';

const path = require('path');

/**
 * Allows to configure aliases for you require loading
 */
module.exports.aliasConfig = {
    alias: {
        base: path.resolve(
            process.cwd(),
            'cartridges/bm_sfcc_super_pd/cartridge/client/default/'
        ),
    },
};

/**
 * Exposes cartridges included in the project
 */
module.exports.cartridges = ['cartridges/bm_sfcc_super_pd', 'cartridges/sfcc_super_pd'];

/**
 * Lint options
 */
module.exports.lintConfig = {
    eslintFix: true,
    stylelintFix: true,
};
