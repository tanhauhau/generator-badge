'use strict';
var badges = require('../util/badges.js'),
     infer = require('../util/infer.js'),
    // inject = require('../util/inject.js'),
    // format = require('../format/index.js'),
    findUp = require('find-up'),
     chalk = require('chalk'),
         _ = require('lodash');

function install(inferred, badge){

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
function installAll(cli){
    var cmds = cli.input.slice(1);
    if(cmds.length === 0){
        return console.log(chalk.red.bold('Usage: badge install <badge> [<args>]'));
    }
    var inferred = infer(cli.pkg, cli.flags);
    var needToBeInstalled = badges.all(cmds);
    if(needToBeInstalled.rejected.length > 0){
        return console.log(chalk.red.bold('Unknown badge: ' + needToBeInstalled.rejected.join(' ')));
    }
    
    console.log(chalk.yellow('Inferring information needed...'));
    inferred.askForMissingDep(needToBeInstalled.badges)
    .then(function(){
        console.log(chalk.yellow('Looking for README...'));
        return findUp('README.md');
    })
    .then(function(filepath){
        console.log(chalk.yellow('Injecting badges into README...'))
        return Promise.all(_.map(needToBeInstalled.badges, install.bind(null, inferred)));
    })
    .then(function(){
        console.log(chalk.green('Done :)'));
    })
    .catch(function(e){
        console.log(chalk.red('Error: ' + e));
    });
}
module.exports = installAll;
