/// <reference path="../reference.d.ts"/>
module openTok {
    export class Base {
        token:string;
        apiKey:string;
        sessionId:string;
        extensionId:string;

        session:any;
        session_publisher:any;
        screen:openTok.components.Screen;
        publisher:openTok.components.Camera;
        count:KnockoutObservable<number>;
        selected:any;
        userList:KnockoutObservableArray<openTok.models.User | any>;
        subscriberList:KnockoutObservableArray<openTok.components.Subscriber | any>;

        constructor() {
            let self = this;
            self.count = ko.observable(0);
            self.selected = null;
            self.userList = ko.observableArray();
            self.publisher = new openTok.components.Camera();
            self.subscriberList = ko.observableArray();
        }
    }
}
