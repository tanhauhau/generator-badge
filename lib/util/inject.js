'use strict';
var  fs = require('fs'),
Promise = require('bluebird'),
   trim = require('trim-newlines'),
through = require('through2');

function append(text, format){
    return function(chunk, enc, callback){
        var injected = chunk.replace(format.regex, format.wrap('\n' + text));
        this.push(injected);
        callback();
    };
}
function clear(format){
    return function (chunk, enc, callback){
        var injected = chunk.replace(format.regex, format.wrap(''));
        this.push(injected);
        callback();
    };
}
function injectFn(path, fn){
    return new Promise(function(resolve, reject){
        fs.createReadStream(path, {encoding: 'utf8'})
        .pipe(through({decodeStrings : false, encoding: 'utf8'}, fn))
        .pipe(fs.createWriteStream('./README.tmp.md'))
        .on('finish', function(){
            fs.createReadStream('./README.tmp.md', {encoding: 'utf8'})
            .pipe(fs.createWriteStream(path))
            .on('finish', function(){
                fs.unlink('./README.tmp.md', function(err){
                    if(err) reject(err);
                    else    resolve();
                });
            })
            .on('error', function(err){
                reject(err);
            });
        })
        .on('error', function(err){
            reject(err);
        });
    });
}

function inject(text, path, format){
    return injectFn(path, append(text, format));
}
inject.clear = function(path, format){
    return injectFn(path, clear(format));
};

module.exports = inject;
