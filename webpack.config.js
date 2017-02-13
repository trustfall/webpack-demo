const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
    app: path.join (__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

const common = {
    //entry accepts a path of an object of entries
    entry:{
        app: PATHS.app,
    },
    output:{
        path: PATHS.build,
        filename: '[name].js',
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Webpack demo'
        })
    ],
};

function production(){
    return common;
}

function development(){
    const config = {
        devServer:{
            //HTML5 History API-based routing
            historyApiFallback: true,
            //don't refresh if HMR fails
            hotOnly: true,
            //display only errors
            stats: 'errors-only',
            host: process.env.HOST, //defaults to localhost
            port: process.env.PORT, //defaults to 8080
        },
        plugins:[
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(), //named modules for debugging
        ],
    };

    return Object.assign(
        {},
        common,
        config,
        {
            plugins: common.plugins.concat(config.plugins),
        }
    );
}

module.exports = function(env){
    if(env === 'production'){
        return production();
    }

    return development();
};