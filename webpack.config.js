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
                test: /\.jsx$/,
                loader:'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        // options: {
                        //     sourceMap: true,
                        //     modules: true,
                        //     localIdentName: "[local]___[hash:base64:5]"
                        // }
                    },
                    {
                        loader: "less-loader"
                    }
                ],
            }
        ]
    }
};