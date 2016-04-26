var markdown = require('./markdown.js'),
    Mustache = require('mustache');

var formatUse = markdown;
function format(name, image, link){
    return Mustache.render(formatUse, {name: name, image: image, link: link });
}
module.exports = format;
