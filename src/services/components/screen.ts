/// <reference path="../../reference.d.ts"/>
module openTok.components {
    export class Screen {
        el:JQuery;
        id:string = openTok.Config.screen_subscriber;
        constructor() {
            let self = this;
            self.init();
        }
        init(){
            let self = this;
            system.Layout.addElement(self.id, openTok.Config.app_share );
            return self.render();
        }
        render(){
            let self = this;
            self.el = $("#" + self.id);return true;
        }
    }
}
