'use strict';
var badges = require('../util/badges.js'),
     infer = require('../util/infer.js'),
    inject = require('../util/inject.js'),
    render = require('../util/render.js'),
   Promise = require('bluebird'),
    // format = require('../format/index.js'),
    findUp = require('find-up'),
     chalk = require('chalk');

//environment variable
var allowInstallIfNotAll = false;

function install(inferred, path, badge){
    var generated = render(badge.format, inferred.data);
    return inject(generated, path);
}
function getBadges(cmds){
    var needToBeInstalled = badges.all(cmds);
    if(needToBeInstalled.rejected.length > 0){
        console.log(chalk.red.bold('Unknown badge: ' + needToBeInstalled.rejected.join(' ')));
        if(!allowInstallIfNotAll){
            return Promise.reject();
        }
    }
    return Promise.resolve(needToBeInstalled.badges);
}
function installAll(cli){
    var cmds = cli.input.slice(1);
    if(cmds.length === 0){
        return console.log(chalk.red.bold('Usage: badge install <badge> [<args>]'));
    }

    getBadges(cmds).bind({})
    .then(function(badge){
        this.badge = badge;
        console.log(chalk.yellow('Inferring information needed...'));
        return infer(cli.pkg, cli.flags);
    })
    .then(function(inferred){
        this.inferred = inferred;
        return inferred.askForMissingDep(this.badge);
    })
    .then(function(){
        console.log(chalk.yellow('Looking for README...'));
        return findUp('README.md');
    })
    .then(function(filepath){
        this.filepath = filepath;
        console.log(chalk.yellow('Injecting badges into README...'))
        return Promise.map(this.badge, install.bind(null, this.inferred, this.filepath));
    })
    .then(function(){
        console.log(chalk.green('Done :)'));
    })
    .catch(function(e){
        console.log(chalk.red('Error: ' + e));
    });
}
module.exports = installAll;
