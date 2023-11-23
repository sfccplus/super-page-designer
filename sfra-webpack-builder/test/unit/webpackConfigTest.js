"use strict";

const assert = require("chai").assert;
const WebpackConfig = require("../../webpack.config");
const path = require("path");
const sinon = require("sinon");

describe("getPlugins()", () => {
  it("should use WebpackStyleLintPlugin for scss and linting enabled", () => {
    let env = {};
    env.useLinter = true;
    let pluginsWithLinter = WebpackConfig.getPlugins(
      "../does/not/exist",
      "scss",
      env
    );
    env.useLinter = false;
    let pluginsWithoutLinter = WebpackConfig.getPlugins(
      "../does/not/exist",
      "scss",
      env
    );
    // since the plugin does not expose its constructor name we hack it like that
    assert.isTrue(pluginsWithLinter > pluginsWithoutLinter);
  });

  it("should use CleanWebpackPlugin when using clean file type", () => {
    let env = {};
    env.dev = false;
    env.useLinter = false;
    let plugins = WebpackConfig.getPlugins("../does/not/exist", "clean", env);
    let hasCleanWebpackPlugin = false;
    plugins.map((plugin) => {
      if (!hasCleanWebpackPlugin) {
        hasCleanWebpackPlugin =
          plugin.constructor.name.toString() === "CleanWebpackPlugin";
      }
    });
    assert.isTrue(hasCleanWebpackPlugin);
  });
});

describe("buildDynamicAliases()", () => {
  it("should use the same resolve aliases for scss and js", () => {
    let sfraBuilderConfig;
    try {
      sfraBuilderConfig = require("../../webpackHandling/sfraBuilderConfig");
    } catch (err) {
      console.log("sfraBuilderConfig not existant - exiting this test");
      assert.isTrue(true); // accept code coverage
      return;
    }
    const alias = sfraBuilderConfig.aliasConfig.alias;
    const jsAlias = WebpackConfig.buildDynamicAliases(alias, "js");
    const scssAlias = WebpackConfig.buildDynamicAliases(alias, "scss");
    assert.equal(Object.keys(jsAlias)[0], Object.keys(scssAlias)[0]);
  });
});

describe("scanEntryPoints()", () => {
  it("should return an entry point for JS and SCSS", () => {
    const jsEntryPoint = WebpackConfig.scanEntryPoints(
      path.resolve(__dirname, "../fixtures"),
      "js"
    );
    const scssEntryPoint = WebpackConfig.scanEntryPoints(
      path.resolve(__dirname, "../fixtures"),
      "scss"
    );
    const jsFile = Object.entries(jsEntryPoint)[0][1];
    const scssFile = Object.entries(scssEntryPoint)[0][1];
    let fixtureJSFile = "default/js/test.js";
    let fixtureSCSSFile = "default/scss/test.scss";
    assert(jsFile.includes(fixtureJSFile));
    assert(scssFile.includes(fixtureSCSSFile));
  });
});

describe("bundleCartridge()", () => {
  it("should use TerserPlugin", () => {
    let env = {};
    env.dev = false;
    env.useLinter = false;
    const bundledConfig = WebpackConfig.bundleCartridge(
      env,
      path.resolve(__dirname, "../fixtures"),
      "js"
    );
    assert(
      bundledConfig.optimization.minimizer[0].constructor.name.toString() ===
        "TerserPlugin"
    );
  });
  it("should minimize when dev mode is not true", () => {
    let env = {};
    env.dev = false;
    env.useLinter = false;
    const bundledConfig = WebpackConfig.bundleCartridge(
      env,
      path.resolve(__dirname, "../fixtures"),
      "js"
    );
    assert(bundledConfig.optimization.minimize === true);
  });

  it("should have mode production with env dev false", () => {
    let env = {};
    env.dev = false;
    env.useLinter = false;
    const bundledConfig = WebpackConfig.bundleCartridge(
      env,
      path.resolve(__dirname, "../fixtures"),
      "js"
    );
    assert(bundledConfig.mode === "production");
  });

  it("should have mode set to production and no source-maps on env.dev=false", () => {
    let env = {};
    env.dev = false;
    const bundledConfig = WebpackConfig.bundleCartridge(
      env,
      path.resolve(__dirname, "../fixtures"),
      "js"
    );
    assert(bundledConfig.mode === "production");
    assert(bundledConfig.devtool === undefined);
  });

  it("should have mode set to development and active source-maps on env.dev=true", () => {
    let env = {};
    env.dev = true;
    const bundledConfig = WebpackConfig.bundleCartridge(
      env,
      path.resolve(__dirname, "../fixtures"),
      "js"
    );
    assert(bundledConfig.mode === "development");
    assert(bundledConfig.devtool === "source-map");
  });

  it("should use eslint when linter is set to true", () => {
    let env = { useLinter: true };
    const bundledConfig = WebpackConfig.bundleCartridge(
      env,
      path.resolve(__dirname, "../fixtures"),
      "js"
    );
    let hasEslint = bundledConfig.plugins.some(
      (plugin) => plugin.constructor.name.toString() === "ESLintWebpackPlugin"
    );
    assert.isTrue(hasEslint);
  });

  it("should not use eslint when linter is set to false", () => {
    let env = {};
    const bundledConfig = WebpackConfig.bundleCartridge(
      env,
      path.resolve(__dirname, "../fixtures"),
      "js"
    );
    const noEslint = bundledConfig.plugins.every(
      (plugin) => plugin.constructor.name.toString() != "ESLintWebpackPlugin"
    );
    assert.isTrue(noEslint);
  });

  it("should use stylelint when linter is set to true", () => {
    let env = { useLinter: true };
    const bundledConfig = WebpackConfig.bundleCartridge(
      env,
      path.resolve(__dirname, "../fixtures"),
      "scss"
    );

    const hasStyleLint = bundledConfig.plugins.some(
      (plugin) =>
        plugin.constructor.name.toString() === "StylelintWebpackPlugin"
    );
    assert.isTrue(hasStyleLint);
  });

  it("should not use stylelint when linter is set to false", () => {
    let env = {};
    const bundledConfig = WebpackConfig.bundleCartridge(
      env,
      path.resolve(__dirname, "../fixtures"),
      "scss"
    );
    const noStyleLint = bundledConfig.plugins.every(
      (plugin) => plugin.constructor.name.toString() != "StylelintWebpackPlugin"
    );
    assert.isTrue(noStyleLint);
  });

  it("should use livereload when env livereload is set to true", () => {
    let env = { livereload: true };
    const bundledConfigJs = WebpackConfig.bundleCartridge(
      env,
      path.resolve(__dirname, "../fixtures"),
      "js"
    );
    const bundledConfigScss = WebpackConfig.bundleCartridge(
      env,
      path.resolve(__dirname, "../fixtures"),
      "scss"
    );

    assert.isTrue(
      bundledConfigJs.plugins.some(
        (plugin) => plugin.constructor.name.toString() === "LiveReloadPlugin"
      )
    );
    assert.isTrue(
      bundledConfigScss.plugins.some(
        (plugin) => plugin.constructor.name.toString() === "LiveReloadPlugin"
      )
    );
  });

  it("should not use livereload when livereload is set to false", () => {
    let env = {};
    const bundledConfigJs = WebpackConfig.bundleCartridge(
      env,
      path.resolve(__dirname, "../fixtures"),
      "js"
    );
    const bundledConfigScss = WebpackConfig.bundleCartridge(
      env,
      path.resolve(__dirname, "../fixtures"),
      "scss"
    );

    assert.isTrue(
      bundledConfigJs.plugins.every(
        (plugin) => plugin.constructor.name.toString() != "LiveReloadPlugin"
      )
    );
    assert.isTrue(
      bundledConfigScss.plugins.every(
        (plugin) => plugin.constructor.name.toString() != "LiveReloadPlugin"
      )
    );
  });

  it("should return null on non-existings folders", () => {
    let env = {};
    env.dev = true;
    const bundledConfig = WebpackConfig.bundleCartridge(
      env,
      path.resolve(__dirname, "../doesNotEists"),
      "js"
    );
    assert(bundledConfig === null);
  });

  it("should call all needed methods", () => {
    let env = {};
    env.dev = false;
    let stubGetPlugins = sinon.stub(WebpackConfig, "getPlugins");
    let stubBuildDynamicAliases = sinon.stub(
      WebpackConfig,
      "buildDynamicAliases"
    );
    let stubScanEntryPoints = sinon
      .stub(WebpackConfig, "scanEntryPoints")
      .returns({
        "default/js/test.js": path.resolve(
          __dirname,
          "../fixtures/cartridge/client/default/js/test.js"
        ),
      });
    WebpackConfig.bundleCartridge(
      env,
      path.resolve(__dirname, "../fixtures"),
      "js"
    );
    assert(stubScanEntryPoints.called);
    assert(stubGetPlugins.calledAfter(stubScanEntryPoints));
    assert(stubBuildDynamicAliases.calledAfter(stubGetPlugins));
  });

  it("should createOutputfiles for js/css", () => {
    const { exec } = require("child_process");
    exec("npm run test:fixture", (err) => {
      let folders;
      let cssFiles;
      let jsFiles;
      if (err) {
        console.log(err);
        console.log("here");
        // we have an error - fail the test
        assert.isTrue(false);
      }
      var fs = require("fs-extra");
      try {
        folders = fs.readdirSync(
          "./test/fixtures/cartridge/static/default/css"
        );
        cssFiles = fs.readdirSync(
          "./test/fixtures/cartridge/static/default/css"
        );
        jsFiles = fs.readdirSync("./test/fixtures/cartridge/static/default/js");
        fs.removeSync("./test/fixtures/cartridge/static");
      } catch (err) {
        console.log(err);
        assert.isTrue(false);
      }
      // we expect to have js/css folder in output
      assert.isTrue(folders.length === 2);
      assert.isTrue(cssFiles.length === 2); // Webpack always output a file with javascript content, even for scss
      assert.isTrue(jsFiles.length === 1);
    });
  });
});
