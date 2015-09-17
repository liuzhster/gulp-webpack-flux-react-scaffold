/*
 * Originally by https://github.com/kriasoft/react-starter-kit
 * React.js Starter Kit
 * Copyright (c) Konstantin Tarkus (@koistya), KriaSoft LLC
 */


var webpack = require('webpack'),
    autoprefixer = require('autoprefixer-core'),
    merge = require('lodash/object/merge'),
    minimist = require('minimist'),
    path = require('path');

var argv = minimist(process.argv.slice(2));
var DEBUG = !argv.release;
var STYLE_LOADER = 'style/useable!';
var CSS_LOADER = DEBUG ? 'css-loader!' : 'css-loader?minimize!';
var AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 20',
    'Firefox >= 24',
    'Explorer >= 8',
    'iOS >= 6',
    'Opera >= 12',
    'Safari >= 6'
];
var GLOBALS = {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    '__DEV__': DEBUG
};

var nodeModulePath = path.join(__dirname, '/node_modules');

module.exports = {
    entry: './app/app.js',

    output: {
        path: './build',
        filename: 'app.js'
    },

    devtool: DEBUG ? 'source-map' : false,

    plugins: [
        new webpack.DefinePlugin(merge(GLOBALS, {'__SERVER__': false})),
        new webpack.optimize.OccurenceOrderPlugin()
    ].concat(DEBUG ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]),

    cache: DEBUG,

    debug: DEBUG,

    stats: {
        colors: true,
        reasons: DEBUG
    },

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },

    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        }],

        loaders: [
            {
                test: /\.css$/,
                loader: STYLE_LOADER + CSS_LOADER + 'postcss-loader'
            },
            {
                test: /\.scss$/,
                loader: STYLE_LOADER + CSS_LOADER + 'postcss-loader!sass-loader'
            },
            {
                test: /\.gif/,
                loader: 'url-loader?limit=10000&mimetype=image/gif'
            },
            {
                test: /\.jpg/,
                loader: 'url-loader?limit=10000&mimetype=image/jpg'
            },
            {
                test: /\.png/,
                loader: 'url-loader?limit=10000&mimetype=image/png'
            },
            {
                test: /\.svg/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },

    postcss: [autoprefixer(AUTOPREFIXER_BROWSERS)]
};