const path = require("path");

function getSfraBuilderConfig() {
  let sfraBuilderConfig;
  if (!process.env.PWD) {
    process.env.PWD = process.cwd();
  }
  let projectDir = process.env.PWD;
  try {
    let cartridgeSfraBuilderConfig = require(projectDir +
      "/package").sfraBuilderConfig;
    let sfraBuilderConfigPath = path.resolve(
      projectDir,
      cartridgeSfraBuilderConfig
    );
    sfraBuilderConfig = sfraBuilderConfigPath;
  } catch (e) {
    sfraBuilderConfig = path.resolve(
      projectDir,
      "./webpackHandling/sfraBuilderConfig.js"
    );
  }

  return sfraBuilderConfig;
}

function getSfraBuilderFixtureConfig() {
  let sfraBuilderConfig;
  let projectDir = process.env.PWD;
  sfraBuilderConfig = path.resolve(
    projectDir,
    "./webpackHandling/fixture_sfraBuilderConfig.js"
  );
  return sfraBuilderConfig;
}

function getCartridgeParentFolder(cartridgeFolder) {
  const cartridgesFolder = "cartridges";
  const regex = new RegExp(cartridgesFolder, "g");

  let parentFolder = "./";
  let lastFolderIndex = -1;
  while (regex.exec(cartridgeFolder) !== null) {
    lastFolderIndex = regex.lastIndex;
  }

  if (lastFolderIndex > -1) {
    parentFolder = cartridgeFolder.substr(
      0,
      lastFolderIndex - cartridgesFolder.length
    );
  }

  return parentFolder;
}

function getNodeModulesFolder(env, folder) {
  return `${process.env.PWD}${env.local ? "" : "/node_modules"}${
    env.testRunner ? "" : "/sfra-webpack-builder/node_modules"
  }/${folder}`;
}

module.exports = {
  getSfraBuilderConfig: getSfraBuilderConfig,
  getSfraBuilderFixtureConfig: getSfraBuilderFixtureConfig,
  getCartridgeParentFolder: getCartridgeParentFolder,
  getNodeModulesFolder: getNodeModulesFolder,
};
