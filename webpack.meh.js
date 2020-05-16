const ifdefOptions = {
    _DEBUG_: true,
    _RELEASE_: false,
    'ifdef-verbose': true
};

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: 'ifdef-loader', options: ifdefOptions }
                ],
                exclude: [/node_modules/]
            }
        ]
    }
};
