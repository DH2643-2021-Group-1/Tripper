const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: { 
        historyApiFallback: true,
        proxy: {
            '/api/**': {
                target: 'http://localhost:8000',
                pathRewrite: {
                    '^/api': '',
                },
                secure: false,
                changeOrigin: true,
                logLevel: 'debug',
            },
        },
    },
});