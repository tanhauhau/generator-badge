'use strict';
const Promise = require('bluebird'),
    writeFile = Promise.promisify(require('write-file-atomic')),
     readFile = Promise.promisify(require('fs').readFile),
         path = require('path'),
            _ = require('lodash');

function config_file(parent){
    return path.resolve(parent, './.badge.json');
}
// const LOCAL_CONFIG_FILE = path.resolve(process.cwd(), './.badge.json');
function readFromLocalConfig(parent){
    return readFile(config_file(parent), "utf8")
        .then(function(contents){
            return JSON.parse(contents);
        })
        .catch(function(){
            return {
                data: {},
                installed: [],
            };
        });
}
function writeToLocalConfig(parent, data){
    data = _.defaults(data || {}, {data: {}, installed: []});
    return writeFile(config_file(parent), JSON.stringify(data));
}

module.exports = {
    readLocal: readFromLocalConfig,
    writeLocal: writeToLocalConfig
};
