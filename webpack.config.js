// const webpack = require('webpack');
// const path = require('path');

module.exports = {
    entry: __dirname + '/app/client/main.js',
    output: {
        path: __dirname + '/app/public/build',
        publicPath: 'build/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }

        ]
    }
};