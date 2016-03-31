/// <reference path="../reference.d.ts"/>
module system {
    export class DomHelper {
        static div(id:string):JQuery {
            return $("<div/>", {id: id});
        }
        static divCss(id:string, className:string):JQuery {
            return $("<div/>", {id: id, class: className});
        }
        static divText(id:string, value:string):JQuery {
            return $("<div/>", {id: id}).text(value);
        }
        static divHtml(id:string, text:string):JQuery {
            return $("<div/>", {id: id}).html(text);
        }
        static divCssText(id:string, value:string, className:string):JQuery {
            return $("<div/>", {id: id, class: className}).text(value);
        }
        static init() {
            DomHelper.div("id");
            DomHelper.divCss("id", "col-md-3");
            DomHelper.divText("id", "hello test.");
            DomHelper.divHtml("id", "<h3>Title</h3>");
            DomHelper.divCssText("id", "hello test", "col-md-3");
        }
    }
}
