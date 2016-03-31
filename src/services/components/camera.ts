/// <reference path="../../reference.d.ts"/>
module openTok.components {
    export class Camera {
        el:JQuery;
        id:string = openTok.Config.camera_publisher;
        constructor() {
            let self = this;
            self.init();
        }
        init(){
            let self = this;
            system.Layout.addElement(self.id, openTok.Config.app_users );
            return self.render();
        }
        render(){
            let self = this;
            self.el = $("#" + self.id);
            return true;
        }
    }
}
