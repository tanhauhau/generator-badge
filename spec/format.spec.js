var format = require('../lib/util/format'),
         _ = require('lodash');

describe('Format', function(){
    var badge = {
        alt: 'this is alt',
        link: 'https://repo.com',
        format: 'https://image.svg'
    };
    var expectation = {
        markdown: '[![this is alt](https://image.svg)](https://repo.com)',
        textile: '!https://image.svg(this is alt)!:https://repo.com',
        rdoc: '{<img src="https://image.svg" alt="this is alt" />}[https://repo.com]',
        asciidoc: 'image:https://image.svg["this is alt", link="https://repo.com"]',
        rst: '.. image:: https://image.svg\n:target: https://repo.com\n:alt: this is alt',
        pod: '=for html <a href="https://repo.com"><img src="https://image.svg" alt="this is alt"></a>',
        html: '<a href="https://repo.com"><img src="https://image.svg" alt="this is alt"></a>'
    };
    _.forIn(expectation, function(value, key){
        it(key, function(){
            expect(format[key](badge)).toEqual(value);
        });
    });
});
