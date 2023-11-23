"use strict";

const path = require("path");
const glob = require("glob");
// @Todo - replace as this is not maintained anymore
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// - cleans static folder
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// - copy config
const WebpackCopyPlugin = require("copy-webpack-plugin");
// - linter
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const StyleLintWebpackPlugin = require("stylelint-webpack-plugin");
// Live reload
var LiveReloadPlugin = require("webpack-livereload-plugin");
// - minification
const TerserPlugin = require("terser-webpack-plugin");
const helper = require("./helper/helper");
let sfraBuilderConfig =
  process.env.npm_lifecycle_script.indexOf("testRunner") === -1
    ? require(helper.getSfraBuilderConfig())
    : require(helper.getSfraBuilderFixtureConfig());
const webpackHelper = require("./webpackHandling/helper");

process.noDeprecation = true;

/**
 * Multicartridge webpack configuration.
 */
class WebpackBundle {
  /**
   * Scans the cartridge client side source folder and returns an
   * object with sass and javascript files.
   *
   * @param {string} cartridge - The cartridge name
   * @return {Object} - Object of sass and js files
   */
  static scanEntryPoints(cartridge, fileType) {
    const srcPath = path.resolve(
      process.env.PWD,
      cartridge,
      "cartridge/client"
    );
    const srcSCSSPath = path.join(srcPath, "*", "scss", "**", "*.scss");
    const srcJSPath = path.join(srcPath, "*", "js", "**", "*.js");
    const srcJSXPath = path.join(srcPath, "*", "js", "**", "*.jsx");
    let files = {};

    // Scan scss files
    if (fileType === "scss") {
      glob
        .sync(srcSCSSPath)
        .filter((source) => !path.basename(source).startsWith("_"))
        .map((source) => {
          let sourceRelativePath = path.dirname(path.relative(srcPath, source));
          sourceRelativePath = sourceRelativePath.split(path.sep);
          sourceRelativePath[1] = sourceRelativePath[1].replace("scss", "css");
          sourceRelativePath = sourceRelativePath.join(path.sep);
          const sourceName = path.basename(source);
          const outputFile = path
            .join(sourceRelativePath, sourceName)
            .replace(".scss", ".scssjs"); // Webpack always create the output file
          // TODO : Find how to not generate those files
          files[outputFile] = source;
          return source;
        });
    }

    // Scan js files
    if (fileType === "js") {
      glob
        .sync(srcJSPath)
        .filter((source) => !path.basename(source).startsWith("_"))
        .map((source) => {
          const sourceRelativePath = path.dirname(
            path.relative(srcPath, source)
          );
          const sourceName = path.basename(source);
          const outputFile = path.join(sourceRelativePath, sourceName);
          files[outputFile] = source;
          return source;
        });
    }

    // Scan jsx files
    if (fileType === "jsx") {
      // Scan jsx files. The output file will copy to static/default/js folder.
      glob
        .sync(srcJSXPath)
        .filter((source) => !path.basename(source).startsWith("_"))
        .map((source) => {
          const sourceRelativePath = path.dirname(
            path.relative(srcPath, source)
          );
          const sourceName = path.basename(source);
          const outputFile = path.join(
            sourceRelativePath.replace("jsx", "js"),
            sourceName.replace(".jsx", ".js")
          );
          files[outputFile] = source;
          return source;
        });
    }
    return files;
  }

  /**
   * Plugins based on the filetype.
   * @param {string} cartridge - The cartridge path
   * @param {string} fileType - determines compilation type
   * @param {boolean} isDevelopment - determines compile mode
   * @return {array} - Array of Plugins
   */
  static getPlugins(cartridge, fileType, env) {
    var plugins = [];
    if (
      fileType === "copy" &&
      sfraBuilderConfig.copyConfig &&
      sfraBuilderConfig.copyConfig[cartridge]
    ) {
      plugins.push(
        new WebpackCopyPlugin({
          patterns: sfraBuilderConfig.copyConfig[cartridge],
        })
      );
    }
    if (fileType === "clean") {
      plugins.push(
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: ["*/js", "*/css", "*/fonts"],
          verbose: false,
        })
      );
    }
    if ((fileType === "js" || fileType === "jsx") && env.useLinter) {
      plugins.push(
        new ESLintWebpackPlugin({
          files: `${cartridge}/cartridge/client`,
          exclude: [
            "node_modules",
            sfraBuilderConfig.sfraFolderName ||
              "storefront-reference-architecture",
          ],
          fix:
            sfraBuilderConfig.lintConfig &&
            sfraBuilderConfig.lintConfig.eslintFix,
        })
      );
    }
    if ((fileType === "scss" || fileType === "jsx") && env.useLinter) {
      plugins.push(
        new StyleLintWebpackPlugin({
          files: `${cartridge}/cartridge/client`,
          exclude: [
            "node_modules",
            sfraBuilderConfig.sfraFolderName ||
              "storefront-reference-architecture",
          ],
          fix:
            sfraBuilderConfig.lintConfig &&
            sfraBuilderConfig.lintConfig.stylelintFix,
        })
      );
    }
    if (fileType === "scss") {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: (pathData) =>
            pathData.chunk.name.replace(/\.scssjs$/, ".css"),
        })
      );
    }
    if (fileType === "jsx") {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: (pathData) =>
            pathData.chunk.name
              .replace("/js/", "/css/")
              .replace(/\.js$/, ".css"),
        })
      );
    }
    if (
      env.livereload &&
      (fileType === "js" || fileType === "jsx" || fileType === "scss")
    ) {
      plugins.push(
        new LiveReloadPlugin({
          ignore: ["**/client/", "*.map"], // We listen only on compiled files
          liveCSS: false,
          liveImg: false,
          useSourceHash: true, // useSourceSize is faster than useSourceHash but but it has a downside. If file size hasn't changed no reload is triggered. For example if color has changed from #000000 to #ffffff no reload will be triggered!)
        })
      );
    }

    return plugins;
  }

  /**
   * @typedef {{base: string}} alias
   */

  /**
   * Webpack uses aliases for module resolving, we build this dynamically so the same alias
   * can be used for a different file type
   * @param {Object} cartridgeAliases - Aliases which are avaible for module resolution
   * @param {string} fileType - JS/JSX or scss
   * @returns {Object} More dynamic aliases
   */
  static buildDynamicAliases(cartridgeAliases, fileType) {
    let aliases = {};
    let aliasKeys = Object.keys(cartridgeAliases);
    aliasKeys.forEach((key) => {
      if (key === "library") {
        aliases[key] = cartridgeAliases[key];
      } else {
        aliases[key] = cartridgeAliases[key] + "/" + fileType;
      }
    });
    return aliases;
  }

  /**
   * @typedef {{dev: boolean, useLinter: boolean}} env
   */

  /**
   * Returns the webpack config object tree.
   * @param {Object} env - Environment variable which can be passed through commandline
   * @param {string} cartridge - The cartridge name
   * @param {string} fileType - The file type
   * @return {Object} - Webpack config
   */
  static bundleCartridge(env = {}, cartridge, fileType) {
    let entryFiles = this.scanEntryPoints(cartridge, fileType);
    console.log("bundleCartridge " + cartridge + " fileType " + fileType);
    if (
      fileType !== "clean" &&
      fileType !== "copy" &&
      Object.keys(entryFiles).length === 0
    ) {
      console.error(
        `Entry not found - please check if ${fileType} folder exist in your cartridge : ${cartridge}`
      );
      return null;
    }

    if (
      Object.keys(sfraBuilderConfig.aliasConfig).length === 0 ||
      Object.keys(sfraBuilderConfig.aliasConfig.alias).length === 0
    ) {
      console.error(
        "Alias config missing - needed for SFRA to compile - exiting"
      );
      return null;
    }

    const outputPath = path.resolve(
      process.env.PWD,
      cartridge,
      "cartridge",
      "static"
    );
    let ruleSet = webpackHelper.buildRuleSet(
      process.env.PWD,
      cartridge,
      env,
      fileType
    );
    let plugins = this.getPlugins(cartridge, fileType, env);
    let modulePaths = ["node_modules"];
    const aliases = this.buildDynamicAliases(
      sfraBuilderConfig.aliasConfig.alias,
      fileType
    );

    // loop through all cartridges for node_modules lookup
    // this allows to require node_modules from every plugin, regardless if those
    // modules are installed in the given plugin
    sfraBuilderConfig.cartridges.forEach((includeCartridges) => {
      const delimiterIndex = includeCartridges.lastIndexOf("cartridges");
      modulePaths.push(
        path.resolve(includeCartridges.slice(0, delimiterIndex), "node_modules")
      );
    });

    return {
      mode: env.dev === true ? "development" : "production",
      name: cartridge + "/" + (fileType === "jsx" ? "js" : fileType),
      stats: { children: false },
      entry: entryFiles,
      output: {
        path: outputPath,
        filename: "[name]",
      },
      resolve: {
        alias: aliases,
        modules: modulePaths,
        extensions: ['', '.js', '.jsx']
      },
      resolveLoader: {
        modules: [helper.getNodeModulesFolder(env, "")],
      },
      module: {
        rules: ruleSet,
      },
      plugins: plugins,
      devtool: env.dev === true ? "source-map" : undefined,
      cache: true,
      optimization: {
        minimize: !(env.dev === true),
        minimizer: [new TerserPlugin()],
      },
    };
  }
}

// default export function
module.exports = (env) => {
  let bundlesFiles = [];
  if (env.testRunner) {
    return invoketestRunner();
  }
  sfraBuilderConfig.cartridges.forEach((cartridge) => {
    bundlesFiles.push(WebpackBundle.bundleCartridge(env, cartridge, "clean"));
    bundlesFiles.push(WebpackBundle.bundleCartridge(env, cartridge, "jsx"));
    bundlesFiles.push(WebpackBundle.bundleCartridge(env, cartridge, "js"));
    bundlesFiles.push(WebpackBundle.bundleCartridge(env, cartridge, "scss"));
    bundlesFiles.push(WebpackBundle.bundleCartridge(env, cartridge, "copy"));
  });

  return bundlesFiles.filter((bundleFiles) => !!bundleFiles);
};

// exposed for testability
module.exports.getPlugins = WebpackBundle.getPlugins;
module.exports.buildDynamicAliases = WebpackBundle.buildDynamicAliases;
module.exports.scanEntryPoints = WebpackBundle.scanEntryPoints;
module.exports.bundleCartridge = WebpackBundle.bundleCartridge;

/**
 * testRunner allows to run the webpack config in testable context
 */
function invoketestRunner() {
  let bundlesFiles = [];
  let sfraBuilderConfigFake = require("./webpackHandling/fixture_sfraBuilderConfig");
  let env = {};
  env.dev = false;
  env.testRunner = true;
  sfraBuilderConfigFake.cartridges.forEach((cartridge) => {
    bundlesFiles.push(WebpackBundle.bundleCartridge(env, cartridge, "js"));
    bundlesFiles.push(WebpackBundle.bundleCartridge(env, cartridge, "scss"));
  });
  return bundlesFiles;
}
