'use strict';
var badges = require('../util/badges.js'),
     chalk = require('chalk'),
         _ = require('lodash'),
 repeating = require('repeating');

function pad(text, count){
    if(count === 0){
        return text + repeating(' ', 15 - text.length);
    }else{
        return repeating(' ', count-2) + '+ ' + text + repeating(' ', 15 - text.length - count);
    }
}
function print(padding, badge){
    padding = padding || 0;
    if(padding === 0){
        console.log(chalk.underline.blue.bold(badge.name) + repeating(' ', 15 - badge.name.length) + (badge.description || ''));
    }else{
        console.log(chalk.cyan.bold(pad(badge.name, padding)) + (badge.description || ''));
    }
    _.each(badge.include, print.bind(null, padding + 2));
}

function list(){
    var badgeList = badges.list();
    _.each(badgeList, print.bind(null, 0));
}
module.exports = list;
