/// <reference path="../reference.d.ts"/>
module openTok {
    export class Provider extends openTok.Handler {

        constructor(apiKey:string, token:string, sessionId:string, extensionId:string) {
            super(apiKey, token, sessionId, extensionId);
            let self = this;
            //@action: initialize event handlers.
            ko.postbox.subscribe(
                openTok.events.Flow.sessionAddScreen, (event:any) => {
                    self.addScreen(event);
                }
            );
            ko.postbox.subscribe(
                openTok.events.Flow.sessionAddSubscriber, (event:any) => {
                    self.addSubscriber(event);
                }
            );
            ko.postbox.subscribe(
                openTok.events.Flow.sessionSelectedItem, (event:any) => {
                    self.toggleSelectedItem(event);
                }
            );
            ko.postbox.subscribe(
                openTok.events.Flow.sessionAddSubscriber, (event:any) => {
                    self.addSubscriber(event);
                }
            );
            ko.postbox.subscribe(
                openTok.events.Flow.publisherToggleAudio, (event:any) => {
                    self.publisherToggle(event);
                }
            );
            ko.postbox.subscribe(
                openTok.events.Flow.publisherToggleVideo, (event:any) => {
                    self.addSubscriber(event);
                }
            );
        }

        //@methods: Screen
        addScreen(event:any) {
            let self = this;
            self.screen = new openTok.components.Screen();
            self.subscribeToScreen(event);
        }

        /*
        * @action: Subscriber
        */
        addSubscriber(event:any) {
            let self = this, name = "", streamId = event.stream.id;
            ko.utils.arrayForEach(self.userList(), (item:models.User) => {
                if (item.id === event.stream.connection.id) {
                    name = item.name;
                }
            });
            let dynInstance = new openTok.components.Subscriber(name, streamId);
            // @action: add to appContext observableArray.
            self.subscriberList.push(dynInstance);
            // @action: subscribes to new stream.
            // command on openTok session.
            self.subscribe(event);
        }

        //@user camera toggle.
        toggleSelectedItem(instanceId:any) {
            let self = this;
            if (self.selected !== null) {
                $("#instance_"+ self.selected).removeClass("fadeInUp animated-500 expanded");
            }
            $("#instance_" + instanceId).addClass("fadeInUp animated-500 expanded");
            self.selected =  instanceId;
        }
        publisherToggle(event:any){
            let self = this;
            self.session_publisher.publishAudio(false);
        }

        toggleAudio(){
            
        }

    }
}