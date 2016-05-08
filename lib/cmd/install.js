'use strict';
var  badges = require('../util/badges.js'),
      infer = require('../util/infer.js'),
     inject = require('../util/inject.js'),
     render = require('../util/render.js'),
guessFormat = require('../util/util.js').guessFormat,
    Promise = require('bluebird'),
     findUp = require('find-up-glob'),
  readPkgUp = require('read-pkg-up'),
      chalk = require('chalk'),
          _ = require('lodash'),
       path = require('path');


function install(inferred, format, badge){
    return render(format(badge), inferred.data);
}
function getBadges(cmds, allowInstallIfNotAll){
    var needToBeInstalled = badges.all(cmds);
    if(needToBeInstalled.rejected.length > 0){
        console.log(chalk.red.bold('Unknown badge: ' + needToBeInstalled.rejected.join(' ')));
        if(!allowInstallIfNotAll){
            return Promise.reject('Error: Unknown badge');
        }
    }
    return Promise.resolve(needToBeInstalled.badges);
}
function addAndCountBadgesToInstalled(){
    this.badge = _.flatMap(this.inferred.installed, (installed) => {
        return badges(installed);
    });
    this.oldBadgeCount = this.badge.length;
    this.newBadgeCount = 0;
    _.each(this._badge, (badge) => {
        if(_.findIndex(this.badge, function(o){ return _.isEqual(badge, o); }) === -1){
            this.badge.push(badge);
            this.newBadgeCount ++;
        }
    });
}
function installAll(cli){
    var cmds = cli.input.slice(1);
    if(cmds.length === 0){
        return console.log(chalk.red.bold('Usage: badge install <badge> [<args>]'));
    }

    getBadges(cmds, cli.flags.ignoreWarning === true).bind({})
    .then(function(badge){
        this._badge = badge;
        console.log(chalk.yellow('Looking for README...'));
        return findUp('README.*');
    })
    .then(function(filepath){
        if(filepath === null){
            return Promise.reject('Error: No README to be found');
        }
        this.filepath = filepath[0];
        this.format = guessFormat(this.filepath);
        return readPkgUp();
    })
    .then(function(pkg){
        this.pkg = pkg.pkg;
        console.log(chalk.yellow('Inferring information needed...'));
        return infer(this.pkg, cli.flags, path.resolve(this.filepath, '../'));
    })
    .then(function(inferred){
        this.inferred = inferred;
        addAndCountBadgesToInstalled.bind(this)();
        return this.inferred.askForMissingDep(this.badge);
    })
    .then(function(){
        console.log(chalk.yellow('Preparing the badges...'));
        return Promise.map(this.badge, install.bind(null, this.inferred, this.format));
    })
    .then(function(texts){
        this.injectedText = texts.join('\n');
        console.log(chalk.yellow('Injecting badges into README...'))
        return inject(this.injectedText, this.filepath, this.format);
    })
    .then(function (){
        console.log(chalk.yellow('Clean up...'));
        return this.inferred.update(this.badge);
    })
    .then(function(){
        console.log(chalk.green(`Installed: ${this.newBadgeCount} badge${this.newBadgeCount > 1 ? 's' : ''}`));
        console.log(chalk.green.bold(`Total: ${this.oldBadgeCount + this.newBadgeCount} badge${(this.oldBadgeCount + this.newBadgeCount) > 1 ? 's' : ''}`));
        console.log(chalk.green('Done :)'));
    })
    .catch(function(e){
        if(e !== undefined) console.log(chalk.red(e));
        process.exit(1);
    });
}
module.exports = installAll;
