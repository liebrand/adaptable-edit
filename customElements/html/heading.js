
var HtmlHeadingProto = Object.create(HtmlParaProto);

HtmlHeadingProto.createdCallback = function() {
};

var HtmlHeading = document.register('html-heading', {prototype: HtmlHeadingProto});
