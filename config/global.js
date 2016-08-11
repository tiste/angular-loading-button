'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = function (_path) {
    const webpackConfig = {
        entry: {
            'angular-loading-button': path.join(_path, 'src', 'angular-loading-button'),
        },

        output: {
            path: 'dist',
            filename: '[name].js',
            publicPath: '/',
        },

        module: {
            loaders: [{
                test: /\.html$/,
                loaders: [
                    `ngtemplate-loader?relativeTo=${_path}`,
                    'html-loader?attrs[]=img:src&attrs[]=img:data-src',
                ],
            }, {
                test: /\.js$/,
                loaders: [
                    'baggage-loader?[file].html&[file].css',
                ],
            }, {
                test: /\.js$/,
                exclude: [
                    path.resolve(_path, 'node_modules'),
                ],
                loader: 'ng-annotate-loader',
            }, {
                test: /\.js$/,
                exclude: [
                    path.resolve(_path, 'node_modules'),
                ],
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    plugins: ['transform-runtime', 'add-module-exports'],
                    presets: ['angular', 'es2015'],
                },
            }, {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader?sourceMap',
                    'postcss-loader',
                ],
            }],
        },

        plugins: [
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.AggressiveMergingPlugin({
                moveToParents: true,
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(_path, 'example', 'index.ejs'),
            }),
        ],
    };

    if (NODE_ENV === 'production') {
        webpackConfig.plugins = webpackConfig.plugins.concat([
            new CleanWebpackPlugin(['dist'], {
                root: _path,
                verbose: true,
                dry: false,
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                warnings: false,
                sourceMap: true,
            }),
            new GhPagesWebpackPlugin({
                path: 'dist',
            }),
        ]);
    }

    if (NODE_ENV === 'development') {
        webpackConfig.plugins = webpackConfig.plugins.concat([
            new webpack.HotModuleReplacementPlugin(),
        ]);
    }

    return webpackConfig;
};
