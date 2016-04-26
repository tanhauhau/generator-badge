'use-strict';
const badges = {
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

function searchBadges(name){
    var splitted = name.split('-');

}

module.exports = badges;
