var badge = require('../lib/util/badges');

describe('Badge', function(){

    it('should return level 1', function(){
        expect(badge('gitter')).toEqual([{
            slogan: 'Chat, for Github',
            format: 'https://img.shields.io/gitter/room/{{repo-username}}/{{repository}}.svg',
            field: ['repo-username', 'repository'],
            alt: 'Gitter',
            description: 'Gitter',
            link: 'https://gitter.im/{{repo-username}}/{{repository}}',
        }]);
    });

    it('should return default', function(){
        expect(badge('david')).toEqual([{
            field: ['repo-username', 'repository'],
            slogan: 'Watching your node.js dependencies.',
            alt: 'david dependency',
            format: 'https://img.shields.io/david/{{repo-username}}/{{repository}}.svg',
            description: 'nodejs dependency',
        }])
    });

    it('should return nested', function(){
        expect(badge('apm-version')).toEqual([{
            field: ['name'],
            slogan: 'Packages make Atom do amazing things.',
            link: 'https://atom.io/packages/{{name}}',
            format: 'https://img.shields.io/apm/v/{{name}}.svg',
            alt: 'apm version',
            description: 'apm version number',
        }]);
    });

    it('should return nested nested', function(){
        expect(badge('apm-download-month')).toEqual([{
            field: ['name'],
            slogan: 'Packages make Atom do amazing things.',
            link: 'https://atom.io/packages/{{name}}',
            alt: 'apm download',
            format: 'https://img.shields.io/apm/dm/{{name}}.svg',
            description: 'apm download per month',
        }]);
    });

    it('should return a list', function(){
        expect(badge('npm-download')).toEqual([{
            field: ['name'],
            slogan: 'npm is the package manager for node.js',
            link: 'https://www.npmjs.com/package/{{name}}',
            alt: 'npm download',
            format: 'https://img.shields.io/npm/dm/{{name}}.svg',
            description: 'npm download per month',
        },
        {
            field: ['name'],
            slogan: 'npm is the package manager for node.js',
            link: 'https://www.npmjs.com/package/{{name}}',
            format: 'https://img.shields.io/npm/dt/{{name}}.svg',
            alt: 'npm download',
            description: 'total npm downloads',
        }]);
    })
})
