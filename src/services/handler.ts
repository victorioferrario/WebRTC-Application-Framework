/// <reference path="../reference.d.ts"/>
module openTok {
    declare let OT:any;
    export class Handler extends Base {

        constructor(apiKey:string, token:string, sessionId:string, extensionId:string) {
            super();
            let self = this;
            self.token = token;
            self.apiKey = apiKey;
            self.sessionId = sessionId;
            self.extensionId = extensionId;
            if (self.init()) {
                OT.registerScreenSharingExtension("chrome", extensionId, 2);
                self.connect();
            }
        }

        //@method: Bind all the openTok events to object prototype.
        init() {
            let self = this;
            self.session = OT.initSession(self.apiKey, self.sessionId);
            // @event:  stream
            self.session.addEventListener(events.WebRtc.streamCreated, (e:any) => {
                self.streamCreated(e);
            });
            self.session.addEventListener(events.WebRtc.streamDestroyed, (e:any) => {
                self.streamDestroyed(e);
            });
            // @event:  session
            self.session.addEventListener(events.WebRtc.sessionConnected, (e:any) => {
                self.sessionConnected(e);
            });
            self.session.addEventListener(events.WebRtc.sessionDisconnected, (e:any) => {
                self.sessionDisconnected(e);
            });
            // @event:  connection
            self.session.addEventListener(events.WebRtc.connectionCreated, (e:any) => {
                self.connectionCreated(e);
            });
            self.session.addEventListener(events.WebRtc.connectionDestroyed, (e:any) => {
                self.connectionDestroyed(e);
            });
            return true;
        }

        //@method: Connect to services, entry point.
        //ToDo: Add Check to see if user has media.
        connect(){
            let self = this;
            
            self.session.connect(self.token, (error: any) => {
               self.session_publisher =  self.session.publish(
                        OT.initPublisher(
                            self.publisher.id,
                            openTok.Config.camera_publisher_options));
            });
        }

        //@event Subscribe
        subscribe(event:any){
            let self = this;
            self.session.subscribe(
                event.stream, event.stream.id,
                openTok.Config.camera_subscriber_options);
        }
        subscribeToScreen(event:any){
            let self = this;
            self.session.subscribe(
                event.stream,
                openTok.Config.screen_subscriber);
        }

        //@event Stream
        streamCreated(event:any) {
            if (event !== undefined) { }
             if (event.stream.videoType === "screen") {
                 ko.postbox.publish(
                     openTok.events.Flow.sessionAddScreen, event);
            } else {
                 ko.postbox.publish(
                     openTok.events.Flow.sessionAddSubscriber, event);
            }
        }
        streamDestroyed(event:any) {
            let self = this;
            self.count(self.count() - 1);
            $(`#instance_${event.stream.id}`).remove();
        }

        //@event: Session.
        sessionConnected(event:any) {
            let self = this;
            console.info("sessionConnected", event);
        }
        sessionDisconnected(event:any) {
            let self = this;
            self.count(self.count() - 1);
            console.info("sessionConnected", event);
        }

        //@event:Connected
        connectionCreated(event:any) {
            let self = this;
            self.count(self.count() + 1);
            let data = JSON.parse(event.connection.data);
            self.userList.push(new models.User(
                event.connection.id, data.name ));
        }
        connectionDestroyed(event:any) {
            let self = this;
            self.count(self.count() - 1);
            if (event !== undefined) {
            }
        }
    }
}
