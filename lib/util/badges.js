'use-strict';
const badges = {
    'travis': {
        field: ['username', 'repository'],
        slogan: 'Build apps with confidence.',
        include: {
            'default': {
                format: 'https://img.shields.io/travis/{{username}}/{{repository}}.svg',
                link: 'https://travis-ci.org/{{username}}/{{repository}}',
                alt: 'travis status',
                description: 'Travis build status of master branch',
            },
            'branch': {
                format: 'https://img.shields.io/travis/{{username}}/{{repository}}/{{branch}}.svg',
                link: 'https://travis-ci.org/{{username}}/{{repository}}/{{branch}}',
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
                include: {
                    'month': {
                        link: 'https://img.shields.io/npm/dm/{{name}}.svg',
                        alt: 'npm download',
                        description: 'npm download per month',
                    },
                    'total': {
                        link: 'https://img.shields.io/npm/dt/{{name}}.svg',
                        alt: 'npm download',
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
                include: {
                    'month': {
                        link: 'https://img.shields.io/apm/dm/{{name}}.svg',
                        alt: 'apm download',
                        description: 'apm download per month',
                    },
                    'total': {
                        link: 'https://img.shields.io/apm/dt/{{name}}.svg',
                        alt: 'apm download',
                        description: 'total apm downloads',
                    }
                }
            }
        }
    },
    'david': {
        field: ['name', 'repository'],
        slogan: 'Watching your node.js dependencies.',
        include: {
            'default': {
                alt: 'david dependency',
                link: 'https://img.shields.io/david/{{name}}/{{repository}}.svg',
                description: 'nodejs dependency',
            },
            'development': {
                alt: 'david dev-dependency',
                link: 'https://img.shields.io/david/dev/{{name}}/{{repository}}.svg',
                description: 'nodejs development dependency',
            }
        }
    }
};

function searchBadges(name){
    var splitted = name.split('-');
    
}

module.exports = badges;
