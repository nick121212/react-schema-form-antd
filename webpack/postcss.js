'use strict';

const webpack = require('webpack');

const postcssBasePlugins = [
    require('postcss-modules-local-by-default'),
    require('postcss-import')({
        addDependencyTo: webpack,
    }),
    require('postcss-cssnext'),
];
const postcssDevPlugins = [];
const postcssProdPlugins = [
    require('cssnano')({
        safe: true,
        sourcemap: true,
        autoprefixer: false,
    }),
];

const postcssPlugins = postcssBasePlugins
    .concat(process.env.NODE_ENV === 'prod' ? postcssProdPlugins : [])
    .concat(process.env.NODE_ENV === 'dev' ? postcssDevPlugins : []);

module.exports = () => {
    return postcssPlugins;
};