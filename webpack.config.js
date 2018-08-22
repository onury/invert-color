'use strict';

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const libraryName = 'invert';
const libraryExport = 'default';
const libPath = path.resolve(__dirname, 'lib');
const srcPath = path.resolve(__dirname, 'src');
const nodeModules = path.resolve(__dirname, 'node_modules');
const publicPath = 'lib/';
const banner = '@license MIT. https://github.com/onury/invert-color';

module.exports = env => {

    const config = {
        context: __dirname, // to automatically find tsconfig.json
        cache: false,
        entry: path.join(srcPath, 'invert.ts'),
        devtool: 'inline-source-map',
        output: {
            library: libraryName,
            filename: libraryName.toLowerCase() + '.js',
            libraryExport
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader',
                include: [srcPath],
                options: {
                    compilerOptions: {
                        // override dir for webpack context (we're already in libPath)
                        outDir: './'
                    },
                    // By default, ts-loader will not compile .ts files in
                    // node_modules. You should not need to recompile .ts files
                    // there, but if you really want to, use this option. Note
                    // that this option acts as a whitelist - any modules you
                    // desire to import must be included in the "files" or
                    // "include" block of your project's tsconfig.json.
                    allowTsInNodeModules: true
                    // IMPORTANT! Since ForkTsCheckerWebpackPlugin is already
                    // doing the type-checking. here we use transpileOnly mode
                    // to speed-up compilation.
                    // transpileOnly: true
                }
            }]
        },
        resolve: {
            modules: [srcPath, nodeModules],
            extensions: ['.ts', '.tsx', '.js']
        },
        // Configure the console output.
        stats: {
            colors: true,
            modules: false,
            reasons: true,
            // suppress "export not found" warnings about re-exported types
            warningsFilter: /export .* was not found in/
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin(),
            new webpack.BannerPlugin(banner)
        ],
        optimization: {
            minimizer: []
        }
    };

    if (env.WEBPACK_OUT === 'coverage') {
        Object.assign(config.output, {
            filename: '.' + libraryName + '.cov.js',
            path: libPath,
            libraryTarget: 'commonjs2',
            umdNamedDefine: false
        });
    } else {

        // production & development
        Object.assign(config.output, {
            path: libPath,
            publicPath,
            libraryTarget: 'umd',
            umdNamedDefine: true,
            // this is to get rid of 'window is not defined' error.
            // https://stackoverflow.com/a/49119917/112731
            globalObject: 'this'
        });

        if (env.WEBPACK_OUT === 'production') {
            config.devtool = 'source-map';
            config.output.filename = libraryName.toLowerCase() + '.min.js';
            config.optimization.minimizer.push(new UglifyJsPlugin({
                test: /\.js$/,
                sourceMap: true,
                uglifyOptions: {
                    ie8: false,
                    ecma: 5,
                    output: {
                        comments: /@license/,
                        beautify: false
                    },
                    compress: {
                        pure_funcs: ['RGB']
                    },
                    warnings: true
                }
            }));
        }
    }

    return config;
};

