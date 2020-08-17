const path = require('path');
module.exports = {
    entry: {
        runtime: './dev/entry.js',
        design: './dev/designer-entry.js'
    },
    output: {
        filename: './[name]/bundle.js',
        path: path.resolve(__dirname, '.'),
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            }
        ]
    }
};



