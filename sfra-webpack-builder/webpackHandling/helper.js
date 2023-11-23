/* eslint-disable strict */
const path = require("path");
const helper = require("../helper/helper");
let sfraBuilderConfig =
  process.env.npm_lifecycle_script.indexOf("testRunner") === -1
    ? require(helper.getSfraBuilderConfig())
    : require(helper.getSfraBuilderFixtureConfig());
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * Add task runners and plugins to ruleSet
 * @param {string} executingDir - DirName from which this script is originally executed to be the same as node_modules
 * @param {string} cartridge - Cartridge to compile
 * @param {boolean} env - Determine the mode of bundling
 * @param {string} fileType - File to add rulesets for
 * @returns {array} Rulesets for frontend compilation
 */
function buildRuleSet(executingDir, cartridge, env, fileType) {
  const sourcePath = path.resolve(executingDir, cartridge, "cartridge/client");
  const ruleSet = [];
  if (fileType === "js") {
    ruleSet.push({
      test: /\.js$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [helper.getNodeModulesFolder(env, "@babel/preset-env")],
          plugins: [
            helper.getNodeModulesFolder(
              env,
              "@babel/plugin-proposal-object-rest-spread"
            ),
          ],
          cacheDirectory: true,
        },
      },
    });
  } else if (fileType === "jsx") {
    ruleSet.push({
      test: /\.jsx$/,
      include: [sourcePath, path.resolve(executingDir, "library")],
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          presets: [
            helper.getNodeModulesFolder(env, "@babel/preset-env"),
            helper.getNodeModulesFolder(env, "@babel/preset-react"),
          ],
          plugins: [
            helper.getNodeModulesFolder(
              env,
              "@babel/plugin-proposal-object-rest-spread"
            ),
            helper.getNodeModulesFolder(
              env,
              "@babel/plugin-proposal-class-properties"
            ),
          ],
        },
      },
    });
    ruleSet.push({
      test: /\.(sa|sc|c)ss$/,
      use: [
        "style-loader",
        { loader: "css-loader" },
        { loader: "sass-loader" },
      ],
    });
  } else if (fileType === "scss") {
    // include all node_modules folder from each cartridge
    // this allows to reuse node_modules folder from other cartridges without the need
    // to directly install them in each cartridge
    let scssIncludePath = [];
    sfraBuilderConfig.cartridges.forEach((includeCartridges) => {
      const delimiterIndex = includeCartridges.lastIndexOf("cartridges");
      scssIncludePath.push(
        path.resolve(includeCartridges.slice(0, delimiterIndex), "node_modules")
      );
      scssIncludePath.push(
        path.resolve(
          includeCartridges.slice(0, delimiterIndex),
          "node_modules/flag-icon-css/sass"
        )
      );
    });
    scssIncludePath.push(path.resolve(executingDir, "node_modules"));
    scssIncludePath.push(
      path.resolve(executingDir, "node_modules/flag-icon-css/sass")
    );
    if (
      sfraBuilderConfig.includeConfig &&
      sfraBuilderConfig.includeConfig[cartridge] &&
      sfraBuilderConfig.includeConfig[cartridge].scss
    ) {
      scssIncludePath.push.apply(
        scssIncludePath,
        sfraBuilderConfig.includeConfig[cartridge].scss.map((includePath) =>
          path.resolve(executingDir, includePath)
        )
      );
    }
    // TODO add include paths to config
    ruleSet.push({
      test: /\.(sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            url: false,
            sourceMap: env.dev === true,
          },
        },
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: ["autoprefixer"],
            },
          },
        },
        {
          loader: "sass-loader",
          options: {
            sassOptions: {
              includePaths: scssIncludePath,
              minimize: env.dev === false,
            },
            sourceMap: env.dev === true,
          },
        },
      ],
    });
  }
  return ruleSet;
}

module.exports = {
  buildRuleSet,
};
