'use strict';

module.exports = function (_path) {
    return {
        context: _path,
        debug: false,
        devtool: 'source-map',
        output: {
            path: 'dist',
            filename: '[name].js',
        },
    };
};
