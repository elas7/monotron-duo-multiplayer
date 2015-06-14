var path = require('path');

// Configuration data
module.exports = {
    entry: './public/static/js/main.js',
    output: {
        path: './public/static/bundles/',
        filename: 'main.js'
    },
    resolve: {
        alias: {
            // remove this once 'webrtc-adapter-test' adds a 'main' field to package.json
            'webrtc-adapter-test': path.join(__dirname, "node_modules/webrtc-adapter-test/adapter.js")
        }
    },
    module: {
        loaders: [
            {
                // apply babel loader only to files in public/static/js
                test: /public\/static\/js\/.*\.js/,
                loader: 'babel-loader'
            }
        ]
    }
};