'use strict';
var  inject = require('../util/inject.js'),
guessFormat = require('../util/util.js').guessFormat,
     config = require('../util/config.js'),
    Promise = require('bluebird'),
     findUp = require('find-up-glob'),
      chalk = require('chalk');

function clear(){
    console.log(chalk.yellow('Looking for README...'));
    findUp('README.*')
    .then(function(filepath){
        if(filepath === null){
            return Promise.reject('Error: No README to be found');
        }
        var path = filepath[0];
        var format = guessFormat(path);
        return inject.clear(path, format);
    })
    .then(function(){
        return config.writeLocal();
    })
    .then(function(){
        console.log(chalk.green('Done :)'));
    })
    .catch(function(e){
        if(e !== undefined) console.log(chalk.red(e));
        process.exit(1);
    });
}
module.exports = clear;
