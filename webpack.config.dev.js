const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const $ = require('jquery');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    context: __dirname,
    entry: {
        main: './src/index.js',
        catalog: './src/catView.js',
        contact: './src/contactView.js',
        adds: './src/addView.js'
            //fpView: './src/fullpartView.js'
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
            { test: /\.(png|svg|jpg|gif|jpeg)$/, use: ['file-loader'] },
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
            favicon: './src/image/true3.png',
            title: 'TQ Bike $ 4x4 Accessories',
            meta: require('./src/json/htmlMeta.json')
        }),
        new CleanWebpackPlugin(['dist']),
        new ManifestPlugin(),
        /*new UglifyJSPlugin({
            sourceMap: true
        })*/
    ],
    output: {
        //filename: 'bundle.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};