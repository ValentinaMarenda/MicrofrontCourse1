const {merge}= require ('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8080/', 
    },
    devServer: {
        port: 8080,
        historyApiFallback:{
            index: 'index.html'
        }
    },
    plugins:[
        new ModuleFederationPlugin ({
            name: 'container',
            remotes:{
                marketing: 'marketing@http://localhost:8081/remoteEntry.js', //"marketing@" have to match up with the name maketing that we worte inside marketing web dev file
                auth: 'auth@http://localhost:8082/remoteEntry.js',
            },
            shared: [packageJson.dependencies],
           // shared: ['react', 'react-dom'] // reduce the number of duplicate dependencies
        }),
    ],
}

module.exports = merge(commonConfig, devConfig)