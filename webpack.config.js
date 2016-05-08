var path = require('path');

// Configuration data
module.exports = {
    entry: {
        client: './app/client.js',
        singleplayer: './app/singleplayer.js'
    },
    output: {
        path: './app/public/static/bundles/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                // apply babel loader only to files in public/static/js
                test: /\.js$/,
                include: [path.resolve(__dirname, "app")],
                loader: 'babel'
            }
        ]
    }
};