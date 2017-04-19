const path = require('path');
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');
const postcssInit = require('./webpack/postcss');
const babelpolyfill = require("babel-polyfill");
const applicationEntries = process.env.NODE_ENV === 'dev' ? ['webpack-hot-middleware/client?reload=true'] : [];
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const stagOrProd = process.env.NODE_ENV == "stag" || process.env.NODE_ENV == "prod";

module.exports = {
    entry: {
        polyfill: 'babel-polyfill',
        index: './demo/index.tsx',
        // app: './src/modules/app/index.tsx',
        // passport: './src/modules/passport/index.tsx',
        // style: './src/style.ts',
        common: ['react']
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: !stagOrProd ? 'http://localhost:8081/dist' : '',
        sourceMapFilename: '[name].[hash].js.map',
        chunkFilename: '[id].chunk.js',
    },

    devtool: 'inline-source-map',

    resolve: {
        extensions: [
            '.webpack.js',
            '.web.js',
            '.tsx',
            '.js',
            '.json',
            '.scss'
        ],
    },

    plugins: plugins,

    devServer: {
        inline: true,
        port: 8081,
        historyApiFallback: { index: '/dist/' },
        publicPath: "/dist/",
        index: "index.html",
    },

    module: {
        rules: [
            loaders.tsx,
            loaders.html,
            loaders.css,
            loaders.svg,
            loaders.eot,
            loaders.ts,
            loaders.woff,
            loaders.woff2,
            loaders.scss,
            loaders.ttf,
            loaders.json,
        ]
    },

    externals: Object.assign({
        'react/lib/ReactContext': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true,
        "react": "React",
        "react-dom": "ReactDOM",
        // 'antd': 'antd',
    })
};