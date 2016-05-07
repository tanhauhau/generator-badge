var format = require('../util/format.js');

module.exports = {};

var EXT_REGEX = /\.(\w+)$/;
module.exports.guessFormat = function(file){
    if(EXT_REGEX.test(file)){
        var ext = file.match(EXT_REGEX)[1].toLowerCase();
        switch(ext){
            case 'md':
            case 'markdown':
                return format.markdown;
            case 'textile':
                return format.textile;
            case 'rdoc':
                return format.rdoc;
            case 'pod':
                return format.pod;
            case 'txt':
                return format.asciidoc;
            case 'html':
                return format.html;
            case 'rst':
                return format.rst;
        }
    }
    return format.markdown;
}
