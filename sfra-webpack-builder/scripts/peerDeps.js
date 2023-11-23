const { exec } = require("child_process");
const { peerDependencies } = require("../package.json");

const peerDeps = Object.keys(peerDependencies)
  .map((peerDep) => `${peerDep}@${peerDependencies[peerDep]}`)
  .join(" ");

console.log("[SWB] Installing peer dependencies");
exec("npm -v", function (error, stdout, stderr) {
  if (error) {
    throw new Error(error);
  }
  console.log(`[SWB] Npm version : ${stdout}`);
  npmVersion = stdout.split(".")[0];
  if (npmVersion <= 3 || npmVersion > 7) {
    console.log(
      "[SWB] Doing nothing... Peer dependencies will be install by npm automatically"
    );
    return;
  }
  exec(
    `\
      npm i --no-save ${peerDeps}`,
    (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log(
        "[SWB] Peer dependencies installed successfully. Ignore peer dependencies install warn from npm"
      );
    }
  );
});
