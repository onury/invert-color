'use strict';

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const libraryName = 'invert';

module.exports = env => {

    const config = {
        cache: false,
        entry: path.resolve(__dirname, 'src', 'index.js'),
        devtool: 'source-map',
        output: {
            library: libraryName,
            filename: libraryName + '.js'
        },
        module: {
            rules: [{
                test: /(\.jsx?)$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                exclude: /(node_modules|bower_components)/
            }]
        },
        resolve: {
            modules: [path.resolve(__dirname, 'src')],
            extensions: ['.js']
        },
        // Configure the console output.
        stats: {
            colors: true,
            modules: false,
            reasons: true
        },
        plugins: []
    };

    if (env.WEBPACK_OUT === 'coverage') {
        Object.assign(config.output, {
            filename: '.' + libraryName + '.cov.js',
            path: path.resolve(__dirname, 'lib'),
            libraryTarget: 'commonjs2',
            umdNamedDefine: false
        });
    } else {

        // production & development
        Object.assign(config.output, {
            path: path.resolve(__dirname, 'lib'),
            publicPath: 'lib/',
            libraryTarget: 'umd',
            umdNamedDefine: true
        });

        if (env.WEBPACK_OUT === 'production') {
            config.output.filename = libraryName + '.min.js';
            config.plugins.push(new UglifyJsPlugin({
                test: /\.js$/,
                sourceMap: true,
                uglifyOptions: {
                    ie8: false,
                    ecma: 5,
                    output: {
                        comments: false,
                        beautify: false
                    },
                    compress: true,
                    warnings: true
                }
            }));
        }
    }

    return config;
};
