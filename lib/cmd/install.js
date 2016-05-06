'use strict';
var badges = require('../util/badges.js'),
     infer = require('../util/infer.js'),
    inject = require('../util/inject.js'),
    render = require('../util/render.js'),
    format = require('../util/format.js'),
   Promise = require('bluebird'),
    findUp = require('find-up'),
 readPkgUp = require('read-pkg-up'),
     chalk = require('chalk');

//environment variable
var allowInstallIfNotAll = false;

function install(inferred, badge){
    var generated = render(format.markdown(badge), inferred.data);
    return Promise.resolve(generated);
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
        return readPkgUp();
    })
    .then(function(pkg){
        this.pkg = pkg.pkg;
        console.log(chalk.yellow('Inferring information needed...'));
        return infer(this.pkg, cli.flags);
    })
    .then(function(inferred){
        this.inferred = inferred;
        return inferred.askForMissingDep(this.badge);
    })
    .then(function(){
        console.log(chalk.yellow('Preparing the badges...'));
        return Promise.map(this.badge, install.bind(null, this.inferred));
    })
    .then(function(texts){
        this.injectedText = texts.join('\n');
        console.log(chalk.yellow('Looking for README...'));
        return findUp('README.md');
    })
    .then(function(filepath){
        this.filepath = filepath;
        console.log(chalk.yellow('Injecting badges into README...'))
        return inject(this.injectedText, this.filepath);
    })
    .then(function(){
        console.log(chalk.green('Done :)'));
    })
    .catch(function(e){
        console.log(chalk.red(e));
        process.exit(1);
    });
}
module.exports = installAll;
