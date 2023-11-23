# SFRA Webpack builder

## Why use it?
Webpack can be cumbersome to setup, especially in multicartridge projects for SFRA.
This plugin let you bundle all your `js`, `scss` and `jsx` files out of the box.

- One pre-build `webpack.config.js` for all cartridges and plugins
- No more `sgmf-script`, which interferes with `Prophet uploader`
- Supports multicartridge projects due to simple configuration
- Supports aliases for `commonjs` or `esm` loading
- Supports eslint while watching
- Supports reuse of node_modules dependencies from other cartridges
- Supports LiveReload via [webpack-livereload-plugin](https://github.com/statianzo/webpack-livereload-plugin) and [Chrome plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei). Use the command `watch:reload`.

## Prerequisite
### Structure 1 : sfra-webpack-builder as installed module
  ```
  .
  +-- storefront-reference-**applicaton******
  +-- plugin_one
  +-- plugin_two
  +-- ....
  +-- node_modules
  +----- ....
  +----- sfra-webpack-builder
  +----- ....
  ```
- Add this repository to your project : `npm install SalesforceCommerceCloud/sfra-webpack-builder --save-dev`
- Add the commands needed to execute to your `package.json`
  ```json
  "npmInstall": "node ./node_modules/sfra-webpack-builder/installHandling/install.js",
  "yarnInstall": "node ./node_modules/sfra-webpack-builder/installHandling/install.js --useYarn",
  "prod": "./node_modules/sfra-webpack-builder/node_modules/.bin/webpack --config ./node_modules/sfra-webpack-builder/webpack.config.js",
  "dev": "./node_modules/sfra-webpack-builder/node_modules/.bin/webpack --config ./node_modules/sfra-webpack-builder/webpack.config.js --env dev",
  "watch": "./node_modules/sfra-webpack-builder/node_modules/.bin/webpack --config ./node_modules/sfra-webpack-builder/webpack.config.js --env dev --watch",
  "watch:lint": "./node_modules/sfra-webpack-builder/node_modules/.bin/webpack --config ./node_modules/sfra-webpack-builder/webpack.config.js --env dev --env useLinter --watch",
  "watch:reload": "./node_modules/sfra-webpack-builder/node_modules/.bin/webpack --config ./node_modules/sfra-webpack-builder/webpack.config.js --env dev --watch --env livereload",
  ```
- Run `npm install`.
### Structure 2 : sfra-webpack-builder as subfolder
In case npm cannot access the SalesforceCommerceCloud workspace on Github, this is the recommended method.

  ```
  .
  +-- storefront-reference-**applicaton******
  +-- plugin_one
  +-- plugin_two
  +-- ....
  +-- sfra-webpack-builder
  +-- node_modules
  +----- ....
  ```
- Download the code to `sfra-webpack-builder` at the root of your project.
- Install module dependencies :
  ```
  cd sfra-webpack-builder
  npm install
  ```
- Add the commands needed to execute to your `package.json`. Notice the use of `--env local`.
  ```json
  "npmInstall": "node ./sfra-webpack-builder/installHandling/install.js",
  "yarnInstall": "node ./sfra-webpack-builder/installHandling/install.js --useYarn",
  "prod": "./sfra-webpack-builder/node_modules/.bin/webpack --config ./sfra-webpack-builder/webpack.config.js --env local",
  "dev": "./sfra-webpack-builder/node_modules/.bin/webpack --config ./sfra-webpack-builder/webpack.config.js --env dev --env local",
  "watch": "./sfra-webpack-builder/node_modules/.bin/webpack --config ./sfra-webpack-builder/webpack.config.js --env dev --watch --env local",
  "watch:lint": "./sfra-webpack-builder/node_modules/.bin/webpack --config ./sfra-webpack-builder/webpack.config.js --env dev --env useLinter --watch --env local",
  "watch:reload": "./sfra-webpack-builder/node_modules/.bin/webpack --config ./sfra-webpack-builder/webpack.config.js --env dev --watch --env local --env livereload",
  ```
- Run `npm install`.
## Usage

**configure the path accordingly in `sfraBuilderConfig.js`**

- Copy `node_modules/sfra-webpack-builder/webpackHandling/example_sfraBuilderConfig.js` to the root-level of your project and rename it to `sfraBuilderConfig.js`

*Example command*
```bash
$ cp node_modules/sfra-webpack-builder/webpackHandling/example_sfraBuilderConfig.js sfraBuilderConfig.js
```
- In the `package.json` of the project, add the key `sfraBuilderConfig` and add the location, where your sfraBuilderConfig is located.
*Example*

`"sfraBuilderConfig": "./sfraBuilderConfig"`

- Configure *cartridges* and *aliases* in `sfraBuilderConfig.js` (based on the location of `sfraBuilderConfig.js`)
**(Ensure that the paths in `sfraBuilderConfig.js` point correctly to the included SFRA and plugins according to your directory structure)** The paths needs to be set relatively to *webpack.config.js*
- Run `npm run npmInstall`. This will setup all cartridges's node_modules dependencies in the directories which are defined in `sfraBuilderConfig.js` `cartridges` array.
- Run `npm run watch` or `npm run prod`. This will compile all related `js/jsx & css` files included in the directories which are defined in `sfraBuilderConfig.js`

***Make sure you installed node_modules in your plugins as well using npm install command***


### Install cartridges dependencies in production mode
This is helpful when you're running npmInstall in a CI/CD environnement and you don't need to install devDependencies for cartridges.
Add ` -- production` to the npmInstall script.
- Structure 1 => `"npmInstall": "node ./node_modules/sfra-webpack-builder/installHandling/install.js -- production",`
- Structure 2 => `"npmInstall": "node ./sfra-webpack-builder/installHandling/install.js -- production",`


### Aliases

`module.exports.aliasConfig` let you specify, how to load module packages inside your plugin. Further information can be found in the [WebpackDocumentation](https://webpack.js.org/configuration/resolve/)

```js
module.exports.aliasConfig = {
    // enter all aliases to configure
    base: path.resolve(
        process.cwd(),
        '../storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/'
    ),
    CustomPlugin: path.resolve(
        process.cwd(),
        '../plugin_wishlists/cartridges/plugin_wishlists/cartridge/client/default/'
    ),
    // Node module alias examples
    '@react': 'preact/compat',
    '@react-dom': 'preact/compat'
}
```

The alias `CustomPlugin` allows to retrieve modules through cartridges by using `require('CustomPlugin/default/js/myFile.js');` or `import Foo from CustomPlugin/default/js/myFile`;


### Copying static files

`module.exports.copyConfig` if present, let you specify, which static files you want to copy during the build, for specific cartridge. This feature uses  [CopyWebpackPlugin](https://webpack.js.org/plugins/copy-webpack-plugin/)
The example below is the equivalent of SFRA's `npm run compile:fonts` command.

```js
/**
 * Allows copying files to static folder
 */
 module.exports.copyConfig = {
    './cartridges/app_storefront_base': [
      { from: './node_modules/font-awesome/fonts/', to: 'default/fonts' },
      { from: './node_modules/flag-icon-css/flags', to: 'default/fonts/flags' },
    ],
  };
```
### Additional SCSS include paths

`module.exports.copyConfig` if present, let you specify custom include paths that you want to be used in compiling SCSS.

```js
/**
 * Allows custom include path config
 */
module.exports.includeConfig = {
  "./cartridges/app_storefront_base": {
    scss: ["my-custom-node_modules"],
  },
};
```

### Testing
Install dependencies
```
npm install
```
This project contains tests which rely on `mocha`.
Please run using `npm run test`

### Acknowledgement
This project was inspired by, and is a heavily modified version of [sfra-webpack-setup](https://github.com/danechitoaie/sfra-webpack-setup)

Thanks to *@danechitoaie* (https://github.com/danechitoaie)

### License

Licensed under the current NDA and licensing agreement in place with your organization. (This is explicitly not open source licensing.)
