'use strict';
var  fs = require('fs'),
   trim = require('trim-newlines'),
through = require('through2');

const BADGE_REGEX = /\<\!--\s+badge\s+\-\-\>([\S\s]*)\<\!--\s+endbadge\s+--\>/i;
function wrapComment(text){
    return '<!-- badge -->' + text + '\n<!-- endbadge -->';
}

function inject(text){
    return new Promise(function(resolve, reject){
        fs.createReadStream('./README.md', {encoding: 'utf8'})
        .pipe(through({decodeStrings : false, encoding: 'utf8'}, function(chunk, enc, callback){
            var injected = chunk.replace(BADGE_REGEX, wrapComment(trim('$1') + text));
            this.push(injected);
            callback();
        }))
        .pipe(fs.createWriteStream('./README.tmp.md'))
        .on('finish', function(){
            fs.createReadStream('./README.tmp.md', {encoding: 'utf8'})
            .pipe(fs.createWriteStream('./README.md'))
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
