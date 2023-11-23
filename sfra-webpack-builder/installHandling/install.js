"use strict";

/**
 * Multicartridge npm installer command.
 */

const helper = require("../helper/helper");
const sfraBuilderConfigPath = helper.getSfraBuilderConfig();
const sfraBuilderConfig = require(sfraBuilderConfigPath);
const installHelper = require("./installHelper");
const useYarn = require("minimist")(process.argv.slice(2)).useYarn;

(() => {
  sfraBuilderConfig.cartridges.forEach((cartridge) => {
    if (useYarn) installHelper.yarnInstall(cartridge);
    else installHelper.npmInstall(cartridge);
  });
})();
