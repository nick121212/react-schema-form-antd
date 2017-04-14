'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const { postcssPlugins } = require('./postcss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");
const sourceMap = process.env.NODE_ENV == 'dev' ? [new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.tsx?$/ })] : [];
const stagOrProd = process.env.NODE_ENV == "stag" || process.env.NODE_ENV == "prod";

const basePlugins = [
    new webpack.DefinePlugin({
        __DEV__: !process.env.NODE_ENV || process.env.NODE_ENV === 'dev',
        __TEST__: process.env.NODE_ENV === 'test',
        __PROD__: process.env.NODE_ENV === 'prod',
        __STAG__: process.env.NODE_ENV === 'stag',
        __ENGINE__: JSON.stringify((!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') ? "mockjs" : "react"),
        __STATE__: JSON.stringify(process.env.NODE_ENV || 'dev')
    }),
    new HtmlWebpackPlugin({
        template: !stagOrProd ? './demo/index.html' : './src/index_prod.html',
        inject: 'body',
        minify: {
            removeComments: true,
            collapseWhitespace: true
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: '[name].bundle.js',
        minChunks: 2
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // new CopyWebpackPlugin([
    //     { from: 'src/assets', to: 'assets' },
    // ]),
    new webpack.ProvidePlugin({
        modelProxy: "modelProxy",
        Mock: "Mock",
    }),
    new CheckerPlugin(),
    // new ExtractTextPlugin("styles.css"),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: function() {
                return postcssPlugins;
            }
        }
    }),
    new ExtractTextPlugin({ filename: "[name].css", allChunks: true, disable: false })
].concat(sourceMap);

const devPlugins = [
    // new StyleLintPlugin({
    //     configFile: './.stylelintrc',
    //     files: ['src/**/*.css'],
    //     failOnError: false,
    // }),
    new webpack.HotModuleReplacementPlugin({
        hot: true
    })
];

const prodPlugins = [
    // new SplitByPathPlugin([
    //     { name: 'vendor', path: [path.join(__dirname, '..', 'node_modules/')] },
    // ]),
    new BabiliPlugin({})
    // new webpack.optimize.UglifyJsPlugin({
    //     comments: false,
    //     mangle: false,
    //     compress: {
    //         warnings: false
    //     }
    // }),
];

module.exports = basePlugins
    .concat(stagOrProd ? prodPlugins : devPlugins);