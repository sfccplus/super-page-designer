"use strict";

const path = require("path");

/**
 * Allows to configure aliases for you require loading
 */
module.exports.aliasConfig = {
  // enter all aliases to configure

  alias: {
    base: path.resolve(
      process.cwd(), // eslint-disable-next-line max-len
      "./cartridges/app_storefront_base/cartridge/client/default/"
    ),
  },
};

/**
 * Allows copying files to static folder
 */
module.exports.copyConfig = {
  "./cartridges/app_storefront_base": [
    { from: "./node_modules/font-awesome/fonts/", to: "default/fonts" },
    { from: "./node_modules/flag-icon-css/flags", to: "default/fonts/flags" },
  ],
};

/**
 * Allows custom include path config
 */
module.exports.includeConfig = {
  "./cartridges/app_storefront_base": {
    scss: ["my-custom-node_modules"],
  },
};

/**
 * Exposes cartridges included in the project
 */
module.exports.cartridges = [
  "./cartridges/app_storefront_base",
  "../plugin_wishlists/cartridges/plugin_wishlists",
];

/**
 * Lint options
 */
module.exports.lintConfig = {
  eslintFix: true,
  stylelintFix: true,
};
