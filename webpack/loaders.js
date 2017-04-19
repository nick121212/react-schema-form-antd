'use strict';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.tslint = {
    test: /\.tsx?$/,
    loader: 'tslint',
    exclude: /node_modules/,
};

exports.tsx = {
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader',
    exclude: /node_modules/,
    query: {
        presets: ['babili']
    }
};

exports.ts = {
    test: /\.ts$/,
    loader: 'ts-loader'
};

exports.istanbulInstrumenter = {
    test: /^(.(?!\.test))*\.tsx?$/,
    loader: ['istanbul-instrumenter-loader'],
    query: {
        embedSource: true,
        esModules: true
    }
};

exports.html = {
    test: /\.html$/,
    loader: 'raw-loader',
    exclude: /node_modules/,
};

exports.css = {
    test: /\.css$/,
    use: [{
        loader: 'style-loader',
    }, {
        loader: 'css-loader',
        options: {
            sourceMap: true,
            importLoaders: 1,
        }
    }, {
        loader: 'postcss-loader',
        options: {
            sourceMap: 'inline',
        }
    }]
};

exports.scss = {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]', 'sass-loader', 'postcss-loader']
    })
};

exports.js = { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' };

exports.json = {
    test: /\.json$/,
    loader: 'json-loader',
};

exports.svg = makeUrlLoader(/\.svg$/);
exports.eot = makeUrlLoader(/\.eot$/);
exports.woff = makeUrlLoader(/\.woff$/);
exports.woff2 = makeUrlLoader(/\.woff2$/);
exports.ttf = makeUrlLoader(/\.ttf$/);

function makeUrlLoader(pattern) {
    return {
        test: pattern,
        loader: 'url-loader',
        exclude: /node_modules/,
    };
}