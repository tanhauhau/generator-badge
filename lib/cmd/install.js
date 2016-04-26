'use strict';
var badges = require('../util/badges.js'),
    inject = require('../util/inject.js'),
    format = require('../format/index.js'),
     chalk = require('chalk'),
  Mustache = require('mustache');

function install(cmd, options){
    var badge = badges[cmd];
    if(badge === undefined){
        return console.log(chalk.red.bold(`Badge '${cmd}' not found.`))
    }

    var field = badge.field || [];
    for(let f of field){
        if(options[f] === undefined){
            //TODO ask for it and update options
            return console.log(chalk.red.bold(`Missing option '${f}'.`))
        }
    }
    var generated = format(cmd, Mustache.render(badge.format || "", options), badge.link || '#');
    inject(generated).then(function(){
        console.log('?');
    }, function(err){
        console.log(err);
    });
}
function installAll(cmds, option){
    if(cmds.length === 0){
        return console.log(chalk.red.bold('Usage: badge install <badge> [<args>]'));
    }
    for(var cmd of cmds){
        help(cmd, option);
    }
}
module.exports = installAll;
