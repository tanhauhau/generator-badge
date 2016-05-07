'use strict';
var badges = require('../util/badges.js'),
     chalk = require('chalk'),
         _ = require('lodash'),
 repeating = require('repeating');

var LEFT_COLUMN = 15;
var LEFT_COLUMN_SPACE_INC = 3;

function pad(text, count){
    if(count === 0){
        return text + repeating(' ', LEFT_COLUMN - text.length);
    }else{
        return repeating(' ', count-LEFT_COLUMN_SPACE_INC) + ' + ' + text + repeating(' ', LEFT_COLUMN - text.length - count);
    }
}
function print(padding, badge){
    padding = padding || 0;
    if(padding === 0){
        console.log(chalk.underline.blue.bold(badge.name) + repeating(' ', LEFT_COLUMN - badge.name.length) + (badge.description || ''));
    }else{
        console.log(chalk.cyan.bold(pad(badge.name, padding)) + (badge.description || ''));
    }
    _.each(badge.include, print.bind(null, padding + LEFT_COLUMN_SPACE_INC));
}

function list(cmd){
    if(cmd.length === 0){
        cmd.push(undefined);
    }
    _.each(cmd, function(c){
        var badgeList = badges.list(c);
        if(c !== undefined) console.log(chalk.underline(c));
        _.each(badgeList, print.bind(null, 0));
        console.log();
    });
}
module.exports = list;
