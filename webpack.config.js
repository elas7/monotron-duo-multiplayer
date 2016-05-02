var path = require('path');

// Configuration data
module.exports = {
    entry: './app/client.js',
    output: {
        path: './app/public/static/bundles/',
        filename: 'client.js'
    },
    module: {
        loaders: [
            {
                // apply babel loader only to files in public/static/js
                test: /\.js$/,
                include: [path.resolve(__dirname, "app")],
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};