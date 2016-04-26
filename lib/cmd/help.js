'use strict';
var badges = require('../util/badges.js'),
      padR = require('pad-right'),
     chalk = require('chalk');

function pad(text){
    return padR(text, 12, ' ');
}
function displayInfo(key, value){
    console.log(chalk.cyan.bold(pad(key)) + ': ' + value);
}

function help(cmd){
    var badge = badges[cmd];
    if(badge === undefined){
        return console.log(chalk.red.bold(`Badge '${cmd}' not found.`))
    }
    console.log(chalk.underline.magenta.bold(cmd));
    if(badge.slogan !== undefined) console.log(chalk.green(badge.slogan));
    displayInfo('Options', (badge.field || ['-']).join(', '));
    if(badge.description !== undefined) displayInfo('Description', badge.description);
    if(badge.link !== undefined) console.log(chalk.underline(badge.link));
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
