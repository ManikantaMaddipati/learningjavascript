const path = require('path');

module.exports = {
    entry: './utils.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'foo.bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
}

