'use strict';
var arrify = require('arrify'),
         _ = require('lodash');

// Badge
const BADGES = {
    'travis': {
        field: ['repo-username', 'repo-name'],
        slogan: 'Build apps with confidence.',
        alt: 'travis status',
        include: {
            'default': {
                format: 'https://img.shields.io/travis/{{repo-username}}/{{repo-name}}.svg',
                link: 'https://travis-ci.org/{{repo-username}}/{{repo-name}}',
                description: 'Travis build status of master branch',
            },
            'branch': {
                format: 'https://img.shields.io/travis/{{repo-username}}/{{repo-name}}/{{repo-branch}}.svg',
                link: 'https://travis-ci.org/{{repo-username}}/{{repo-name}}/{{repo-branch}}',
                field: ['repo-branch'],
                description: 'Travis build status for branch',
            }
        },
    },
    'wercker': {
        field: ['wercker-repo-key'],
        slogan: 'From Code to Containers.',
        alt: 'wercker status',
        link: 'https://app.wercker.com/project/bykey/{{wercker-repo-key}}',
        description: 'Wercker build status',
        include: {
            'default': {
                format: 'https://app.wercker.com/status/{{wercker-repo-key}}/s',
            },
            'large': {
                format: 'https://app.wercker.com/status/{{wercker-repo-key}}/m',
            }
        },
    },
    'appveyor': {
        field: ['repo-username', 'repo-name'],
        slogan: '#1 Continuous Delivery service for Windows',
        alt: 'appveyor status',
        include: {
            'default': {
                format: 'https://img.shields.io/travis/{{repo-username}}/{{repo-name}}.svg',
                link: 'https://ci.appveyor.com/project/{{repo-username}}/{{repo-name}}',
                description: 'AppVeyor build status of master branch',
            },
            'branch': {
                format: 'https://img.shields.io/travis/{{repo-username}}/{{repo-name}}/{{repo-branch}}.svg',
                link: 'https://ci.appveyor.com/project/{{repo-username}}/{{repo-name}}',
                field: ['repo-branch'],
                description: 'AppVeyor build status for branch',
            }
        },
    },
    'npm': {
        field: ['name'],
        slogan: 'npm is the package manager for node.js',
        link: 'https://www.npmjs.com/package/{{name}}',
        include: {
            'version': {
                format: 'https://img.shields.io/npm/v/{{name}}.svg',
                alt: 'npm version',
                description: 'npm version number',
            },
            'license': {
                format: 'https://img.shields.io/npm/l/{{name}}.svg',
                alt: 'npm license',
                description: 'npm license',
            },
            'download': {
                alt: 'npm download',
                include: {
                    'month': {
                        format: 'https://img.shields.io/npm/dm/{{name}}.svg',
                        description: 'npm download per month',
                    },
                    'total': {
                        format: 'https://img.shields.io/npm/dt/{{name}}.svg',
                        description: 'total npm downloads',
                    }
                }
            }
        }
    },
    'apm': {
        field: ['name'],
        slogan: 'Packages make Atom do amazing things.',
        link: 'https://atom.io/packages/{{name}}',
        include: {
            'version': {
                format: 'https://img.shields.io/apm/v/{{name}}.svg',
                alt: 'apm version',
                description: 'apm version number',
            },
            'license': {
                format: 'https://img.shields.io/apm/l/{{name}}.svg',
                alt: 'apm license',
                description: 'apm license',
            },
            'download': {
                alt: 'apm download',
                include: {
                    'total': {
                        format: 'https://img.shields.io/apm/dt/{{name}}.svg',
                        description: 'total apm downloads',
                    }
                }
            }
        }
    },
    'david': {
        field: ['repo-username', 'repo-name'],
        slogan: 'Watching your node.js dependencies.',
        include: {
            'default': {
                alt: 'david dependency',
                format: 'https://img.shields.io/david/{{repo-username}}/{{repo-name}}.svg',
                description: 'nodejs dependency',
            },
            'development': {
                alt: 'david dev-dependency',
                format: 'https://img.shields.io/david/dev/{{repo-username}}/{{repo-name}}.svg',
                description: 'nodejs development dependency',
            },
            'optional': {
                alt: 'david optional dependency',
                format: 'https://img.shields.io/david/optional/{{repo-username}}/{{repo-name}}.svg',
                description: 'nodejs optional dependency',
            },
            'peer': {
                alt: 'david peer dependency',
                format: 'https://img.shields.io/david/peer/{{repo-username}}/{{repo-name}}.svg',
                description: 'nodejs peer dependency',
            },
        }
    },
    'gitter': {
        slogan: 'Chat, for Github',
        format: 'https://img.shields.io/gitter/room/{{repo-username}}/{{repo-name}}.svg',
        field: ['repo-username', 'repo-name'],
        alt: 'Gitter',
        description: 'Gitter',
        link: 'https://gitter.im/{{repo-username}}/{{repo-name}}',
    },
    'github': {
        slogan: 'How people build software',
        field: ['repo-username'],
        description: 'Github',
        link: 'https://github.com/{{repo-username}}/{{repo-name}}',
        include: {
            'followers': {
                alt: 'GitHub followers',
                format: 'https://img.shields.io/github/followers/{{repo-username}}.svg?style=social&label=Follow',
                link: 'https://github.com/{{repo-username}}',
            },
            'forks': {
                alt: 'GitHub forks',
                format: 'https://img.shields.io/github/forks/{{repo-username}}/{{repo-name}}.svg?style=social&label=Fork',
                field: ['repo-name'],
                link: 'https://github.com/{{repo-username}}/{{repo-name}}/fork',
            },
            'stars': {
                alt: 'GitHub stars',
                format: 'https://img.shields.io/github/stars/{{repo-username}}/{{repo-name}}.svg?style=social&label=Star',
                field: ['repo-name'],
            },
            'watchers': {
                alt: 'GitHub watchers',
                format: 'https://img.shields.io/github/watchers/{{repo-username}}/{{repo-name}}.svg?style=social&label=Watch',
                field: ['repo-name'],
            },
            'issues': {
                alt: 'GitHub issues',
                format: 'https://img.shields.io/github/issues/{{repo-username}}/{{repo-name}}.svg',
                field: ['repo-name'],
                link: 'https://github.com/{{repo-username}}/{{repo-name}}/issues',
            },
        },
    }
};

// Searching
const VERIFY_REGEX = /^[a-zA-Z]+(\-[a-zA-Z]+)*$/;
const PARSE_REGEX  = /[a-zA-Z]+/g;

function extend(parent, child){
    var result = _.extend(_.clone(parent), child);
    result.field = _.concat(arrify(parent.field), arrify(child.field));
    return result;
}

function getAll(location, parent, keys){
    if(location.include === undefined){
        var obj = _.omit(extend(parent, location), ['include']);
        obj._name = keys.join('-');
        return obj;
    }else{
        var all = Array();
        _.forIn(location.include, function(value, key){
            all = _.concat(all, getAll(value, extend(parent, location), _.concat(keys, key)));
        });
        return all;
    }
}

function lookInto(names, location, parent, keys){
    if(names.length === 0){
        if(location === undefined && !_.isEmpty(parent)){
            return getAll(parent, {}, []);
        }else if(location.default !== undefined){
            return getAll(location.default, parent, _.concat(keys, 'default'));
        }else{
            var all = Array();
            _.forIn(location, function(value, key){
                all = _.concat(all, getAll(value, parent, _.concat(keys, key)));
            });
            return all;
        }
    }else{
        var name = names[0];
        if(location === undefined || location[name] === undefined){
            return undefined;
        }else if(names.length === 1 && location[name].include === undefined){
            return getAll(location[name], parent, _.concat(keys, name));
        }else{
            return lookInto(names.slice(1), location[name].include, extend(parent, location[name]), _.concat(keys, name));
        }
    }
}
function searchBadges(name){
    if(!VERIFY_REGEX.test(name)) return [];
    var badge = name.match(PARSE_REGEX);
    return arrify(lookInto(badge, BADGES, {}, []));
}
searchBadges.all = function(names){
    var rejected = [];
    var badges = [];
    _.forIn(names, function(name){
        var badge = searchBadges(name);
        if(badge.length === 0){
            rejected.push(name);
        }else{
            _.each(badge, function(b){
                if(_.findIndex(badges, function(o){ return _.isEqual(b, o); }) === -1){
                    badges.push(b);
                }
            });
        }
    });
    return {
        rejected: rejected,
        badges: badges
    };
};

// Listing
function list(node){
    return _.map(node, function(value, key){
        var n = { name: key, description: value.description };
        if(value.include !== undefined){
            n.include = list(value.include);
        }
        return n;
    });
}
searchBadges.list = function(){
    return list(BADGES);
};
module.exports = searchBadges;
