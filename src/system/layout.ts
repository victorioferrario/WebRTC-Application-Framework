/// <reference path="../reference.d.ts"/>
module system {
    export class Layout {
        static addElement(id:string, selector:string) {
            if (document.getElementById(id) === null) {
                $(selector).append(DomHelper.div(id));
            }
        }
        static addJQueryElement(id:string, target:string, jquery:JQuery) {
            if (document.getElementById(id) === null) {
                $("#" + target).append(jquery);
            }
        }
        static addStream(id:string, value:string):JQuery {
            return DomHelper.divCss("instance_" + id,
                openTok.Config.instance_wrapper)
                .append(DomHelper.div("video_" + id))
                .append(DomHelper.divCss("controls_"+ id, openTok.Config.instance + "_controls"))
                .append(DomHelper.divCss(id, openTok.Config.instance))
                .append(DomHelper.divCssText("name_" + id, value, openTok.Config.instance_name));
        }
    }
}
