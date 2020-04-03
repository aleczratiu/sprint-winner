const path = require('path');
const Dotenv = require('dotenv-webpack');
const dotenvSafe = require('dotenv-safe');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = function override(config) {
    config.plugins.map((plugin) => {
        if (plugin.constructor.name === 'GenerateSW') {
            return new WorkboxWebpackPlugin.InjectManifest({
                swSrc: './src/sw.js',
                swDest: 'service-worker.js',
            });
        }

        return plugin;
    });

    const envFilePath = '.env';
    const dot = new Dotenv({
        path: envFilePath,
        systemvars: true,
    });

    dotenvSafe.config({
        path: envFilePath,
    });

    config.plugins.push(dot);

    return config;
};
