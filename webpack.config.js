const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const $ = require('jquery');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const IP = '172.16.0.104';
//const IP = '127.0.0.1';
const PORT = 5500;

module.exports = {
    context: __dirname,
    entry: {
        main: './src/index.js',
        catalog: './src/catView.js',
        contact: './src/contactView.js',
        adds: './src/addView.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.exec\.js$/, use: ['script-loader'] },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ["url-loader?limit=10000&mimetype=application/font-woff"] },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ["file-loader"] },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader", // translates CSS into CommonJS
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", // compiles Sass to CSS
                    options: {
                        includePaths: [
                            './node_modules/bootstrap/scss/',
                            './node_modules/bootstrap/scss/mixins',
                            './node_modules/bootstrap/scss/utilities',
                        ],
                        sourceMap: true

                    },
                }]
            },
            { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: true,
                        collapseWhitespace: true
                    }
                }],
            },
            { test: /\.handlebars$/, loader: "handlebars-loader" },
            { test: /\.txt$/, use: 'raw-loader' }
        ],

    },
    plugins: [

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Popper: ['popper.js', 'default'],
        }),

        new HTMLWebpackPlugin({
            template: './src/html/index.html',
        }),
        new CleanWebpackPlugin(['dist']),
        new ManifestPlugin(),

    ],
    output: {
        //filename: 'bundle.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};