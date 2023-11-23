"use strict";

require("../setup").start();
const assert = require("chai").assert;
const WebpackHelper = require("../../webpackHandling/helper");
const path = require("path");

describe("buildRuleSet()", () => {
  it("scss should have source-maps if env is set to dev", () => {
    let env = {};
    env.dev = true;
    const rules = WebpackHelper.buildRuleSet(
      __dirname,
      path.resolve(__dirname, "../fixtures"),
      env,
      "scss"
    );
    let hasSourceMaps = true;
    rules.map((rule) => {
      if (rule.loader) {
        rule.loader.foreEach((taskRunner) => {
          if (taskRunner.options.sourceMap === false) {
            hasSourceMaps = false;
          }
        });
      }
    });
    assert.isTrue(hasSourceMaps);
  });

  it("should include all relevant paths for node_modules", () => {
    let sfraBuilderConfig;
    try {
      sfraBuilderConfig = require("../../webpackHandling/sfraBuilderConfig");
    } catch (err) {
      console.log("sfraBuilderConfig not existant - exiting this test");
      assert.isTrue(true); // accept code coverage
      return;
    }
    let env = {};
    env.useLinter = false;
    const rules = WebpackHelper.buildRuleSet(
      __dirname,
      path.resolve(__dirname, "../fixtures"),
      env,
      "scss"
    );
    let availableTaskRunners = [];
    let expectedIncludePaths = [];
    rules.map((rule) => {
      rule.loader.map((taskRunner) => {
        availableTaskRunners.push(taskRunner.loader);
        if (taskRunner.options.includePaths) {
          expectedIncludePaths = taskRunner.options.includePaths;
        }
      });
    });
    // each cartridge needs to include node_modules & node_modules/flag-icon-css/sass
    // externalPaths == sfraBuilderConfig.cartridges.length * 2
    // current path also includes node_modules & node_modules/flag-icon-css/sass
    // allPaths = externalPaths + 2
    let includePathsToCheck = sfraBuilderConfig.cartridges.length * 2 + 2;
    assert.strictEqual(includePathsToCheck, expectedIncludePaths.length);
    assert.isTrue(availableTaskRunners.indexOf("css-loader") !== -1);
    assert.isTrue(availableTaskRunners.indexOf("postcss-loader") !== -1);
    assert.isTrue(availableTaskRunners.indexOf("sass-loader") !== -1);
  });
});

require("../setup").stop();
