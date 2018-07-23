"use strict";

var WebpackNotifierPlugin = require('webpack-notifier');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin');
var webpack = require('webpack');
var path = require("path");
var publicRootPath = path.resolve(__dirname, "wwwroot");

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    return [{
        devtool: isDevBuild ? '#source-map' : false,

        entry: {
            bundle: "./ClientApp/index.js"
        },
        output: {
            path: publicRootPath,
            filename: "js/[name].js",
			publicPath: '/',
			hotUpdateChunkFilename: 'hot/hot-update.js',
			hotUpdateMainFilename: 'hot/hot-update.json'
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    loader: "babel-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: "font/[name].[ext]"
                        },
                    },
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: "img/[name].[ext]"
                        },
                    },
                },
                {
                    test: /\.css$/,
                    include: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    sourceMap: true
                                }
                            }
                        ],
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: "css/[name].css",
            }),
            new CleanWebpackPlugin(["css/*.*", "js/*.*", "font/*.*", "img/*.*"], { root: publicRootPath }), 
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin({ sourceMap: true, parallel: true, compress: { warnings: false } }),
            new OptimizeCssWebpackPlugin({ cssProcessorOptions: { save: true } })      
        ])
    }];  
};