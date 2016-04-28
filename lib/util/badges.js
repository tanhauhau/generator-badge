var arrify = require('arrify'),
         _ = require('lodash');
const BADGES = {
    'travis': {
        field: ['repo-username', 'repository'],
        slogan: 'Build apps with confidence.',
        include: {
            'default': {
                format: 'https://img.shields.io/travis/{{repo-username}}/{{repository}}.svg',
                link: 'https://travis-ci.org/{{repo-username}}/{{repository}}',
                alt: 'travis status',
                description: 'Travis build status of master branch',
            },
            'branch': {
                format: 'https://img.shields.io/travis/{{repo-username}}/{{repository}}/{{branch}}.svg',
                link: 'https://travis-ci.org/{{repo-username}}/{{repository}}/{{branch}}',
                field: ['branch'],
                description: 'Travis build status for branch',
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
                    'month': {
                        format: 'https://img.shields.io/apm/dm/{{name}}.svg',
                        description: 'apm download per month',
                    },
                    'total': {
                        format: 'https://img.shields.io/apm/dt/{{name}}.svg',
                        description: 'total apm downloads',
                    }
                }
            }
        }
    },
    'david': {
        field: ['repo-username', 'repository'],
        slogan: 'Watching your node.js dependencies.',
        include: {
            'default': {
                alt: 'david dependency',
                format: 'https://img.shields.io/david/{{repo-username}}/{{repository}}.svg',
                description: 'nodejs dependency',
            },
            'development': {
                alt: 'david dev-dependency',
                format: 'https://img.shields.io/david/dev/{{repo-username}}/{{repository}}.svg',
                description: 'nodejs development dependency',
            }
        }
    },
    'gitter': {
        slogan: 'Chat, for Github',
        format: 'https://img.shields.io/gitter/room/{{repo-username}}/{{repository}}.svg',
        field: ['repo-username', 'repository'],
        alt: 'Gitter',
        description: 'Gitter',
        link: 'https://gitter.im/{{repo-username}}/{{repository}}',
    },
};
const VERIFY_REGEX = /^[a-zA-Z]+(\-[a-zA-Z]+)*$/;
const PARSE_REGEX  = /[a-zA-Z]+/g;

function getAll(location, parent){
    if(location.include === undefined){
        return _.omit(_.extend(_.clone(parent), location), ['include']);
    }else{
        var all = Array();
        _.forIn(location.include, function(value, key){
            all.push(getAll(value, _.extend(_.clone(parent), location)));
        });
        return all;
    }
}

function lookInto(names, location, parent){
    if(names.length === 0){
        if(location === undefined && !_.isEmpty(parent)){
            return getAll(parent, {});
        }else if(location.default !== undefined){
            return getAll(location.default, parent);
        }else{
            var all = Array();
            _.forIn(location, function(value, key){
                all.push(getAll(value, parent));
            });
            return all;
        }
    }else{
        var name = names[0];
        if(location === undefined || location[name] === undefined){
            return undefined;
        }else if(names.length === 1 && location[name].include === undefined){
            return getAll(location[name], parent);
        }else{
            return lookInto(names.slice(1), location[name].include, _.extend(_.clone(parent), location[name]));
        }
    }
}
function searchBadges(name){
    if(!VERIFY_REGEX.test(name)) return [];
    var badge = name.match(PARSE_REGEX);
    return arrify(lookInto(badge, BADGES, {}));
}

module.exports = searchBadges;
