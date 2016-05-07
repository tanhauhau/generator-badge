var badge = require('../lib/util/badges');

describe('Badge', function(){

    it('should return level 1', function(){
        expect(badge('gitter')).toEqual([{
            slogan: 'Chat, for Github',
            format: 'https://img.shields.io/gitter/room/{{repo-username}}/{{repo-name}}.svg',
            field: ['repo-username', 'repo-name'],
            alt: 'Gitter',
            description: 'Gitter',
            link: 'https://gitter.im/{{repo-username}}/{{repo-name}}',
            _name: 'gitter',
        }]);
    });

    it('should return default', function(){
        expect(badge('david')).toEqual([{
            field: ['repo-username', 'repo-name'],
            slogan: 'Watching your node.js dependencies.',
            alt: 'david dependency',
            format: 'https://img.shields.io/david/{{repo-username}}/{{repo-name}}.svg',
            description: 'nodejs dependency',
            _name: 'david-default',
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
            _name: 'apm-version',
        }]);
    });

    it('should return nested nested', function(){
        expect(badge('apm-download-total')).toEqual([{
            field: ['name'],
            slogan: 'Packages make Atom do amazing things.',
            link: 'https://atom.io/packages/{{name}}',
            alt: 'apm download',
            format: 'https://img.shields.io/apm/dt/{{name}}.svg',
            description: 'total apm downloads',
            _name: 'apm-download-total',
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
            _name: 'npm-download-month',
        },
        {
            field: ['name'],
            slogan: 'npm is the package manager for node.js',
            link: 'https://www.npmjs.com/package/{{name}}',
            format: 'https://img.shields.io/npm/dt/{{name}}.svg',
            alt: 'npm download',
            description: 'total npm downloads',
            _name: 'npm-download-total',
        }]);
    });

    it('should return nothing on empty string', function(){
        expect(badge('')).toEqual([]);
    });

    it('should return nothing when no match', function(){
        expect(badge('*')).toEqual([]);
        expect(badge('wrong')).toEqual([]);
        expect(badge('wrong-match')).toEqual([]);
        expect(badge('apm-match')).toEqual([]);
    });

    it('should return all', function(){
        expect(badge('npm')).toEqual([{
            field: ['name'],
            slogan: 'npm is the package manager for node.js',
            link: 'https://www.npmjs.com/package/{{name}}',
            format: 'https://img.shields.io/npm/v/{{name}}.svg',
            alt: 'npm version',
            description: 'npm version number',
            _name: 'npm-version',
        },
        {
            field: ['name'],
            slogan: 'npm is the package manager for node.js',
            link: 'https://www.npmjs.com/package/{{name}}',
            format: 'https://img.shields.io/npm/l/{{name}}.svg',
            alt: 'npm license',
            description: 'npm license',
            _name: 'npm-license',
        },
        {
            field: ['name'],
            slogan: 'npm is the package manager for node.js',
            link: 'https://www.npmjs.com/package/{{name}}',
            alt: 'npm download',
            format: 'https://img.shields.io/npm/dm/{{name}}.svg',
            description: 'npm download per month',
            _name: 'npm-download-month',
        },
        {
            field: ['name'],
            slogan: 'npm is the package manager for node.js',
            link: 'https://www.npmjs.com/package/{{name}}',
            alt: 'npm download',
            format: 'https://img.shields.io/npm/dt/{{name}}.svg',
            description: 'total npm downloads',
            _name: 'npm-download-total',
        }]);
    });

    it('should merge fields', function(){
        expect(badge('travis-branch')).toEqual([{
            field: ['repo-username', 'repo-name', 'repo-branch'],
            slogan: 'Build apps with confidence.',
            format: 'https://img.shields.io/travis/{{repo-username}}/{{repo-name}}/{{repo-branch}}.svg',
            link: 'https://travis-ci.org/{{repo-username}}/{{repo-name}}/{{repo-branch}}',
            description: 'Travis build status for branch',
            alt: 'travis status',
            _name: 'travis-branch',
        }])
    });

    it('should return all with promise', function(){
        var all = badge.all(['david', 'gitter']);
        expect(all).toEqual(jasmine.any(Object));
        expect(all.rejected).toEqual(jasmine.any(Array));
        expect(all.rejected.length).toEqual(0);
        expect(all.badges).toEqual(jasmine.any(Array));
        expect(all.badges.length).toEqual(2);
    });

    it('should return all with promise with rejected', function(){
        var all = badge.all(['a', 'gitter']);
        expect(all).toEqual(jasmine.any(Object));
        expect(all.rejected).toEqual(jasmine.any(Array));
        expect(all.rejected.length).toEqual(1);
        expect(all.rejected).toEqual(['a']);
        expect(all.badges).toEqual(jasmine.any(Array));
        expect(all.badges.length).toEqual(1);
    });

    it('should return all with promise with uniq', function(){
        var all = badge.all(['npm', 'npm-license']);
        expect(all).toEqual(jasmine.any(Object));
        expect(all.rejected).toEqual(jasmine.any(Array));
        expect(all.rejected).toEqual([]);
        expect(all.badges).toEqual(jasmine.any(Array));
        expect(all.badges).toEqual([{
            field: ['name'],
            slogan: 'npm is the package manager for node.js',
            link: 'https://www.npmjs.com/package/{{name}}',
            format: 'https://img.shields.io/npm/v/{{name}}.svg',
            alt: 'npm version',
            description: 'npm version number',
            _name: 'npm-version',
        },
        {
            field: ['name'],
            slogan: 'npm is the package manager for node.js',
            link: 'https://www.npmjs.com/package/{{name}}',
            format: 'https://img.shields.io/npm/l/{{name}}.svg',
            alt: 'npm license',
            description: 'npm license',
            _name: 'npm-license',
        },
        {
            field: ['name'],
            slogan: 'npm is the package manager for node.js',
            link: 'https://www.npmjs.com/package/{{name}}',
            alt: 'npm download',
            format: 'https://img.shields.io/npm/dm/{{name}}.svg',
            description: 'npm download per month',
            _name: 'npm-download-month',
        },
        {
            field: ['name'],
            slogan: 'npm is the package manager for node.js',
            link: 'https://www.npmjs.com/package/{{name}}',
            alt: 'npm download',
            format: 'https://img.shields.io/npm/dt/{{name}}.svg',
            description: 'total npm downloads',
            _name: 'npm-download-total',
        }]);
    });
    it('should list badge', function(){
        //preliminary list
        var shouldContain = [
            { name: 'travis',
              include: [
                  { name: 'default', description: 'Travis build status of master branch' },
                  { name: 'branch', description: 'Travis build status for branch' }
              ]},
            { name: 'npm',
              include: [
                  { name: 'version', description: 'npm version number' },
                  { name: 'license', description: 'npm license' },
                  { name: 'download', description: 'Download count',
                    include: [
                        { name: 'month', description: 'npm download per month' },
                        { name: 'total', description: 'total npm downloads' }
                    ]}
              ]},
            { name: 'apm',
              include: [
                  { name: 'version', description: 'apm version number' },
                  { name: 'license', description: 'apm license' },
                  { name: 'download', description: 'Download count',
                    include: [
                        { name: 'total', description: 'total apm downloads' }
                    ]}
              ]},
            { name: 'david',
              include: [
                  { name: 'default', description: 'nodejs dependency' },
                  { name: 'development', description: 'nodejs development dependency' },
                  { name: 'optional', description: 'nodejs optional dependency' },
                  { name: 'peer', description: 'nodejs peer dependency' },
              ]},
            { name: 'gitter',
              description: 'Gitter'
            }
        ];
        for(var i in shouldContain){
            expect(badge.list()).toContain(shouldContain[i]);
        }
    });
    it('should sublist badge', function(){
        expect(badge.list('npm')).toEqual([{ name: 'npm',
          include: [
              { name: 'version', description: 'npm version number' },
              { name: 'license', description: 'npm license' },
              { name: 'download', description: 'Download count',
                include: [
                    { name: 'month', description: 'npm download per month' },
                    { name: 'total', description: 'total npm downloads' }
                ]}
          ]}]);
    });
})
