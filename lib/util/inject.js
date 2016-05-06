'use strict';
var  fs = require('fs'),
Promise = require('bluebird'),
   trim = require('trim-newlines'),
through = require('through2');

const BADGE_REGEX = /\<\!--\s+badge\s+\-\-\>([^\<]*)\<\!--\s+endbadge\s+--\>/gi;
function wrapComment(text){
    return '<!-- badge -->' + text + '\n<!-- endbadge -->';
}

function inject(text, path){
    return new Promise(function(resolve, reject){
        fs.createReadStream(path, {encoding: 'utf8'})
        .pipe(through({decodeStrings : false, encoding: 'utf8'}, function(chunk, enc, callback){
            console.log('/////---------');
            console.log(chunk);
            var injected = chunk.replace(BADGE_REGEX, wrapComment(trim('$1') + text));
            this.push(injected);
            callback();
        }))
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

module.exports = inject;
