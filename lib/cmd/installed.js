'use strict';
var  config = require('../util/config.js'),
     findUp = require('find-up-glob'),
       path = require('path'),
          _ = require('lodash'),
      chalk = require('chalk');

// List installed badges, based on .badge.json
function installed(){
    findUp('README.*')
    .then(function(filepath){
        if(filepath === null){
            return process.cwd();
        }else{
            return path.resolve(filepath[0], '../');
        }
    })
    .then(function(parent){
        return config.readLocal(parent);
    })
    .then(data => {
        if(data.installed.length === 0){
            console.log(chalk.bold('No badges installed.'));
        }else{
            // console.log(chalk.bold.underline(`Installed(${data.installed.length}):`));
            _.each(data.installed, i => { console.log(i) });
            console.log(chalk.bgBlue.bold(`Total: ${data.installed.length} `))
        }
    });
}
module.exports = installed;
