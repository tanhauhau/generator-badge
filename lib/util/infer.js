var gitRepo = require('git-branch'),
    gitRepoName = require('git-repo-name'),
    gitUserName = require('git-username'),
    config = require('configstore'),
    inquirer = require('inquirer'),
    _ = require('lodash'),
    Promise = require('bluebird');

var Inferred = function(pkg, flags){
    this.data = {};
    this.data['name'] = flags.name || pkg.name || undefined;
    this.data['repo-username'] = flags.repoUsername || undefined;
    this.data['repo-name'] = flags.repoName || undefined;
    this.data['repo-branch'] = flags.repoBranch || undefined;
};
Inferred.prototype.lookForGit = function () {
    //TODO look for git
    // console.log(gitRepoName.sync());
    return Promise.resolve();
};
Inferred.prototype.lookForStoredPreference = function () {
    //TODO
    return Promise.resolve();
};
Inferred.prototype.lookForGlobalPreference = function () {
    //TODO
    return Promise.resolve();
};
Inferred.prototype.askForMissingDep = function(badges){
    var _this = this;
    var needed = _.uniq(_.flatMap(badges, function(badge){ return badge.field; }));
    needed = _.filter(needed, function(n){
        return _this.data[n] === undefined;
    })
    var neededPrompt = _.map(needed, function(need){
        return {
            type: 'input',
            name: need,
            message: need + ': ',
        }
    });
    return inquirer.prompt(neededPrompt)
    .then(function(answers){
        _.extend(_this.data, answers);
    });
};
var infer = function(pkg, flags){
    return Promise.resolve(new Inferred(pkg, flags)).bind({})
    .then(function(inferred){
        this.inferred = inferred;
        return this.inferred.lookForStoredPreference();
    })
    .then(function(){
        return this.inferred.lookForGlobalPreference();
    })
    .then(function(){
        return this.inferred.lookForGit();
    })
    .then(function(){
        return Promise.resolve(this.inferred);
    });
};

module.exports = infer;
