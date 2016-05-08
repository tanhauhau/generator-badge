'use strict';
var  Promise = require('bluebird'),
    parseGit = Promise.promisify(require('parse-git-config')),
 parseGitURL = require('parse-github-url'),
globalConfig = require('configstore'),
 localConfig = require('./config.js'),
    inquirer = require('inquirer'),
           _ = require('lodash'),
       chalk = require('chalk');

var Inferred = function(pkg, flags, configPath){
    this.data = {};
    this.guess = {};
    this.installed = [];
    this.configPath = configPath;
    this.data['name'] = flags.name || pkg.name || undefined;
    this.data['repo-username'] = flags.repoUsername || undefined;
    this.data['repo-name'] = flags.repoName || undefined;
    this.data['repo-branch'] = flags.repoBranch || undefined;
    this.data['wercker-repo-key'] = flags.werckerRepoKey || undefined;
};
Inferred.prototype.lookForGit = function (giturl) {
    if(this.data['repo-name'] && this.data['repo-username'] && this.data['repo-branch']){
        //If already have all the data needed, skip
        return Promise.resolve();
    }else{
        return parseGit()
                .then(function(git){
                    return parseGit.keys(git);
                })
                .then(function(git){
                    if(git && git.remote && git.remote.origin && git.remote.origin.url){
                        return parseGitURL(git.remote.origin.url);
                    } else {
                        return parseGitURL(giturl)
                    }
                })
                .then((parsedGit) => {
                    this.guess['repo-username'] = parsedGit.owner;
                    this.guess['repo-name'] = parsedGit.name;
                    this.guess['repo-branch'] = parsedGit.branch;
                });
    }
};
Inferred.prototype.lookForStoredPreference = function (noCache) {
    return localConfig.readLocal(this.configPath)
            .then(data => {
                //-no-cache flag ignores any stored known value in .badge.json
                if(!!noCache){
                    this.installed = data.installed;
                    return this;
                }else{
                    return _.defaultsDeep(this, data);
                }
            });
};
Inferred.prototype.lookForGlobalPreference = function () {
    //TODO
    return Promise.resolve();
};
Inferred.prototype.askForMissingDep = function(badges){
    var needed = _.uniq(_.flatMap(badges, function(badge){ return badge.field; }));
    needed = _.filter(needed, (n) => {
        return this.data[n] === undefined;
    })
    var neededPrompt = _.map(needed, need => {
        return {
            type: 'input',
            name: need,
            message: need + ': ',
            'default': this.guess[need],
        };
    });
    return inquirer.prompt(neededPrompt)
    .then(answers => {
        _.extend(this.data, answers);
    });
};
Inferred.prototype.update = function(badges){
    return localConfig.writeLocal(this.configPath, {
        data: this.data,
        installed: _.map(badges, function(badge){ return badge._name; }),
    })
};
var infer = function(pkg, flags, path){
    return Promise.resolve(new Inferred(pkg, flags, path)).bind({})
    .then(function(inferred){
        this.inferred = inferred;
        return this.inferred.lookForStoredPreference(flags.cache === false);
    })
    .then(function(){
        return this.inferred.lookForGlobalPreference();
    })
    .then(function(){
        return this.inferred.lookForGit(pkg.repository && pkg.repository.url);
    })
    .catch(function(e){
        //Catch all infer error here, not to let it flow to downstream outside
        console.log(chalk.red('Failed to infer data'));
        console.log(chalk.red(e));
        if(this.inferred === undefined){
            this.inferred = new Inferred({}, {});
        }
        return this.inferred;
    })
    .then(function(){
        return this.inferred;
    });
};
module.exports = infer;
