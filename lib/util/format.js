var render = require('./render.js');

function formatMarkdown(badge){
    return render('[![{{alt}}]({{format}})]({{link}})', badge);
}
function formatTextile(badge){
    return render('!{{format}}({{alt}})!:{{link}}', badge);
}
function formatRDoc(badge){
    return render('{<img src="{{format}}" alt="{{alt}}" />}[{{link}}]', badge);
}
function formatASCIIDoc(badge){
    return render('image:{{format}}["{{alt}}", link="{{link}}"]', badge);
}
function formatRST(badge){
    return render('.. image:: {{format}}\n:target: {{link}}\n:alt: {{alt}}', badge);
}
function formatPod(badge){
    return render('=for html <a href="{{link}}"><img src="{{format}}" alt="{{alt}}"></a>', badge);
}
function formatHTML(badge){
    return render('<a href="{{link}}"><img src="{{format}}" alt="{{alt}}"></a>', badge);
}
module.exports = {
    markdown: formatMarkdown,
    textile: formatTextile,
    rdoc: formatRDoc,
    asciidoc: formatASCIIDoc,
    rst: formatRST,
    pod: formatPod,
    html: formatHTML,
};
