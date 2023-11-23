const { exec } = require("child_process");

module.exports.start = function () {
  exec(
    "cp webpackHandling/example_sfraBuilderConfig.js webpackHandling/sfraBuilderConfig.js"
  );
};

module.exports.stop = function () {
  exec("rm webpackHandling/sfraBuilderConfig.js");
};
