var render = require('./render.js');

function formatMarkdown(badge){
    return render('[![{{alt}}]({{format}})]({{link}})', badge);
}
formatMarkdown.regex = /\<\!--\s+badge\s+\-\-\>([^\<]*)\<\!--\s+endbadge\s+--\>/gi;
formatMarkdown.wrap = function(text){
    return '<!-- badge -->' + text + '\n\n<!-- endbadge -->';
};

function formatTextile(badge){
    return render('!{{format}}({{alt}})!:{{link}}', badge);
}
formatTextile.regex = /\#\#\#\.\s+badge\n([\S\s]*)\n\#\#\#\. endbadge/gi;
formatTextile.wrap = function(text){
    return '###. badge' + text + '\n\n###. endbadge';
}

function formatRDoc(badge){
    return render('{<img src="{{format}}" alt="{{alt}}" />}[{{link}}]', badge);
}
formatRDoc.regex = formatMarkdown.regex; //TODO
formatRDoc.wrap = formatMarkdown.wrap; //TODO

function formatASCIIDoc(badge){
    return render('image:{{format}}["{{alt}}", link="{{link}}"]', badge);
}
formatASCIIDoc.regex = /\/\/\/\/\s+badge\n([\S\s]*)\n\/\/\/\//gi;
formatASCIIDoc.wrap = function(text){
    return '\/\/\/\/ badge' + text + '\n\n\/\/\/\/';
}

function formatRST(badge){
    return render('.. image:: {{format}}\n:target: {{link}}\n:alt: {{alt}}', badge);
}
formatRST.regex = formatMarkdown.regex; //TODO
formatRST.wrap = formatMarkdown.wrap; //TODO

function formatPod(badge){
    return render('=for html <a href="{{link}}"><img src="{{format}}" alt="{{alt}}"></a>', badge);
}
formatPod.regex = formatMarkdown.regex; //TODO
formatPod.wrap = formatMarkdown.wrap; //TODO

function formatHTML(badge){
    return render('<a href="{{link}}"><img src="{{format}}" alt="{{alt}}"></a>', badge);
}
formatHTML.regex = /\<\!--\s+badge\s+\-\-\>([^\<]*)\<\!--\s+endbadge\s+--\>/gi;
formatHTML.wrap = function(text){
    return '<!-- badge -->' + text + '\n\n<!-- endbadge -->';
};

module.exports = {
    markdown: formatMarkdown,
    textile: formatTextile,
    rdoc: formatRDoc,
    asciidoc: formatASCIIDoc,
    rst: formatRST,
    pod: formatPod,
    html: formatHTML,
};
