'use strict';
const TEMPLATE_REGEX = /\{\{\s*(\w+)\s*\}\}/g;
function render(template, obj){
    template = template || '';
    obj = obj || {};
    return template.replace(TEMPLATE_REGEX, function(all, name){
        return obj[name] || '';
    });
}
module.exports = render;
