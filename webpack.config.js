'use strict';

const _ = require('underscore');
const _configs = {
    global: require(__dirname + '/config/global'),

    production: require(__dirname + '/config/production'),
    development: require(__dirname + '/config/development'),
};

const _load = function () {
    const NODE_ENV = process.env.NODE_ENV || 'production';

    return _configs && _.assign(
        _configs.global(__dirname),
        _configs[NODE_ENV](__dirname)
    );
};

module.exports = _load();
