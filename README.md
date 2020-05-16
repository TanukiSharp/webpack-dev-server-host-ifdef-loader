# Overview

This is a minimal reproduction project for an issue with Webpack dev server, the host parameter and the ifdef loader.

For all the following, I recommend running your browser with the dev tools open on the console all the time.

## How to test

### Ensure the regular case works

Open a terminal to the root of the repository and run:

```sh
nvm use
npm install
npm run success
```

Open a browser to `http://localhost:8080` and you should see a blank page with "\_DEBUG\_" printed.

To make sure the `ifdef-loader` works correctly, you can open the file `webpack.meh.js` and change the the `ifdefOptions` as follow:

```js
const ifdefOptions = {
    _DEBUG_: false,
    _RELEASE_: true,
    'ifdef-verbose': true
};
```

Refresh your browser and now you should see "\_RELEASE\_". Sometimes there is a problem at first refresh, so if it doesn't work, refresh again.

### Check failure case

If you ran the previous step, then shutdown `webpack-dev-server`.

```sh
nvm use # No need if already done.
npm install # No need if already done.
npm run failure
```

As you can see in `package.json`, the only difference between running the `success` script and the `failure` script, is having the `host` parameter set.

The goal of having this set to `0.0.0.0` is to test the app with a mobile device, so not being able to do that is not an option.

Now refresh your browser and you should see the following error:

```
Module build failed (from ./node_modules/ifdef-loader/ifdef-loader.js):
Error: ifdef-loader error: error evaluation #if condition(_DEBUG_): ReferenceError: _DEBUG_ is not defined
```

### What I tried

I tried to the `devServer` property in the webpack config file instead of having arguments on the command line in `package.json`, but it didn't change anything.

I tried to disable the live reload, because I originally thought the hot reload where rebuilding the file with a slightly different config and that the `ifdef-loader` was not taken into account, but nothing changed.

Hereafter is the accumulation of the changes I made to the `devServer` property in the webpack config file:
```js
module.exports = {
    // ...
    devServer: {
        host: '0.0.0.0',
        hot: false,
        inline: false,
        liveReload: false,
        watchOptions: {
            ignored: true
        }
    },
    // ...
}
```

And the problem still occurs.

I also tried to set the `--client-log-level` to `trace` and `debug` in hope the frontend would say something useful, but nothing changed, log level was same on the frontend and in the terminal where `webpack-dev-server` was running.

### Notes

The reason the webpack config file is called `webpack.meh.js` is because in my real scenario, I use `webpack-merge` and therefore none of my webpack config files are named with the default `webpack.config.js`, and I wanted to make sure there is no extra hidden biais if the config file would be named as the default.

The reason I used conditional compilation variables `_DEBUG_` and `_RELEASE_` and not simpler `DEBUG` and `RELEASE` is because it seems webpack is adding `DEBUG` on its own in development mode, so when I tested first, my code with `/// #if DEBUG` was working fine, and then when I started to write real code, it blew to my face.

### Environment

Name | Version | Comment
---|---|---
Ubuntu | 18.04.4 LTS | In WSL on Windows 10 (version 1909)
Node | 12.16 | *See .nvmrc file*
ifdef-loader | 2.1.5 | *See package.json file*
webpack | 4.43.0 | *See package.json file*
webpack-cli | 3.3.11 | *See package.json file*
webpack-dev-server | 3.11.0 | *See package.json file*
