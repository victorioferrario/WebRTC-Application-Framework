/// <reference path="../../reference.d.ts"/>
module openTok.components {
    export class Subscriber {
        name:string;
        streamId:string;
        instance:JQuery;
        constructor(name:string, streamId:string) {
            let self = this;
            self.name = name;
            self.streamId = streamId;
            self.instance  = system.Layout.addStream(streamId, name);
            self.instance.on("click", ()=> {
                if (!self.instance.hasClass("expanded")) {
                    ko.postbox.publish(
                       openTok.events.Flow.sessionSelectedItem, self.streamId);
                } else {
                    self.instance.removeClass("fadeInUp animated-500 expanded");
                }
            });
            self.render();
        }
        mute(){
            let self = this;
             
        }

        render() {
            let self = this;
            system.Layout.addJQueryElement(
                self.streamId, openTok.Config.camera_subscriber, self.instance);
            self.createChildControls();
        }

        createChildControls(){
            let self = this;
            $("#controls_"+ self.streamId).html("<a href='javascript:void(0);'>Mute</a>")
        }
    }
}
