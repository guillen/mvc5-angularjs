const path = require('path')

module.exports = {
    entry: path.join(__dirname, '/public/index.js'),
    output: {
        filename: 'index.min.js',
        path: path.join(__dirname, '/Content/'),
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        ]
    },
    watch: true,
}
