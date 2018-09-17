/* eslint-env node */
const {resolve} = require('path');
const webpack = require('webpack');
const {version} = require('./package.json');

const rules = {
    rules: [
        {
            test: /\.svg$/,
            use: 'raw-loader'
        }
    ]
};

module.exports = [
    {
        entry: './src/js/nestable',
        output: {
            path: __dirname,
            filename: 'dist/js/nestable.js',
        },
        mode: 'development',
        module: rules,
        plugins: [
            new webpack.DefinePlugin({
                BUNDLED: true,
                VERSION: `'${version}'`
            }),
            new webpack.optimize.ModuleConcatenationPlugin()
        ],
        resolve: {
            alias: {
                'uikit-util': resolve(__dirname, 'node_modules/uikit/src/js/util')
            }
        }
    }
];