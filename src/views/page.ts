/// <reference path="../reference.d.ts"/>
module views {
    export class Lobby {
        props:KnockoutObservableArray<KnockoutObservable<boolean>|any>;
        isLobbyView:KnockoutObservable<boolean>;
        isModerator:KnockoutObservable<boolean>;
        isPublisher:KnockoutObservable<boolean>;
        isSubscriber:KnockoutObservable<boolean>;
        constructor() {
            let self = this;
            self.init();
        }

        init() {
            let self = this;
            self.isLobbyView = ko.observable(true);
            self.isModerator = ko.observable(false);
            self.isPublisher = ko.observable(false);
            self.isSubscriber = ko.observable(false);
            self.props = ko.observableArray([self.isLobbyView, self.isModerator, self.isPublisher, self.isSubscriber]);
            return true;
        }

        select(value:openTok.models.WebRtcUserType) {
            let self = this;
            if (self.reset()) {
                switch (value) {
                    case openTok.models.WebRtcUserType.None:
                        self.isLobbyView(true);
                        break;
                    case openTok.models.WebRtcUserType.Moderator:
                        self.isModerator(true);
                        break;
                    case openTok.models.WebRtcUserType.Student:
                        self.isPublisher(true);
                        break;
                    case openTok.models.WebRtcUserType.StudentWithNoCamera:
                        self.isSubscriber(true);
                        break;
                }
            }
            return true;
        }

        reset() {
            let self = this;
            ko.utils.arrayForEach(
                self.props(), (item:KnockoutObservable<boolean>) => {
                    item(false);
                });
            return true;
        }
    }
    export class Room {
        mediaControls:openTok.components.triState.MediaControls;
        isConnected:KnockoutObservable<boolean>;
        constructor() {
            let self = this;
            self.isConnected = ko.observable(false);
            self.mediaControls = new openTok.components.triState.MediaControls();
            self.mediaControls.links().forEach(function (item) {
                console.info("hello", item);
            });
        }
        click(data:any) {
            let self = this;
            switch (data.event) {
                case openTok.components.triState.ClickEvent.cast:
                    if (data.data.state() === openTok.components.triState.ControlState.On) {
                        self.isConnected(true);
                        data.data.state(openTok.components.triState.ControlState.Off);
                        self.mediaControls.links().forEach(function (item) {
                            if (item.event !== "action:cast:start") {
                                item.data.state(openTok.components.triState.ControlState.On);
                            }
                        });
                    } else {
                        data.data.state(
                            openTok.components.triState.ControlState.On);
                        self.isConnected(false);
                        self.mediaControls.links().forEach(function (item) {
                            if (item.event !== "action:cast:start") {
                                item.data.state(openTok.components.triState.ControlState.Disabled);
                            }
                        });
                    }
                    break;
                default:
                    data.clickHandler(data);
                    break;
            }
            // alert("parent")
        }
        start(){
            let self = this;
            self.isConnected(true);
            self.mediaControls.links()[0].data.state(openTok.components.triState.ControlState.Off);
           // data.data.state(openTok.components.triState.ControlState.Off);
            self.mediaControls.links().forEach(function (item) {
                console.log(item);
                if (item.event !== "action:cast:start") {
                    item.data.state(openTok.components.triState.ControlState.On);
                }else{
                    item.data.state(openTok.components.triState.ControlState.Off);
                }
            });
        }
    }
    export class Page {
        lobby:Lobby;
        room:Room;
        appContext:openTok.Provider;
        constructor() {
            let self = this;
            self.room = new Room();
            self.lobby = new Lobby();
        }
        startSession() {
            let self = this;
            if (self.lobby.isModerator()) {
                self.room.start();
                self.appContext = new openTok.Provider(
                    openTok.debug.apiKey,
                    openTok.debug.moderator_Token,
                    openTok.debug.moderator_SessionId, openTok.debug.extensionId);
            } else if(self.lobby.isPublisher()){
                self.appContext = new openTok.Provider(
                    openTok.debug.apiKey,
                    openTok.debug.publisher_Token,
                    openTok.debug.publisher_SessionId, openTok.debug.extensionId);
            }
        }
        exitSession() {
            let self = this;
            self.lobby.isLobbyView(true);
            self.appContext.session.disconnect();
        }
        select(arg:any){
             let self = this;
             if(self.lobby.select(arg)){
                 self.startSession();
             }
        }
        close(){
            this.exitSession();
        }
    }
}