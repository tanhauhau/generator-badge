'use strict';
var badges = require('../util/badges.js'),
     chalk = require('chalk'),
         _ = require('lodash'),
 repeating = require('repeating');

function pad(text){
    return text + repeating(' ', 12 - text.length);
}
function displayInfo(key, value){
    console.log(chalk.cyan.bold(pad(key)) + ': ' + value);
}
function help(cmd){
    var badge = badges(cmd);
    if(badge.length === 0){
        return console.log(chalk.red.bold(`Badge '${cmd}' not found.`))
    }
    _.each(badge, function(value){
        console.log(chalk.underline.magenta.bold(value._name));
        if(value.slogan !== undefined) console.log(chalk.green(value.slogan));
        if(value.description !== undefined) displayInfo('Description', value.description);
        displayInfo('Fields', (value.field || ['-']).join(', '));
        displayInfo('Image', value.format);
        displayInfo('Link', value.link);
        console.log('');
    });
}
function helpAll(cmds){
    if(cmds.length === 0){
        return console.log(chalk.red.bold('Usage: badge help <badge>'));
    }
    for(var cmd of cmds){
        help(cmd);
    }
}
module.exports = helpAll;
