/// <reference path="../../reference.d.ts"/>
module openTok.components.triState {
    export enum ControlState {
        None = 0,
        On = 1,
        Off = 2,
        Disabled = 3,
    }
    export interface IToggle {
        on:string;
        off:string;
    }
    export interface IMediaOption {
        css?:IToggle;
        icon?:IToggle;
        text?:IToggle;
        tooltip?:IToggle;
    }
    export interface IMediaControl {
        event:string;
        state:ControlState;
        options:MediaOption;
    }
    export class ClickEvent {
        static cast:string = "action:cast:start";
        static mute:string = "action:mute:toggle";
        static broadcast:string = "action:broadcast:toggle";
    }
    export class LinkItem {
        event:string;
        data:MediaOptionObservable;
        constructor(data:IMediaControl) {
            let self = this;
            self.event = data.event;
            self.data = new MediaOptionObservable(data.options, data.state);
        }
        clickHandler(data:any) {
            let self = this;
            if (self.data.state() === ControlState.On) {

                self.data.state(ControlState.Off);
            } else {
                self.data.state(ControlState.On);
            }
            ko.postbox.publish(
                openTok.events.Flow.publisherToggleAudio);
        }
    }
    export class MediaOption implements IMediaOption {
        css:IToggle;
        icon:IToggle;
        text:IToggle;
        tooltip:IToggle;

        constructor(opt:IMediaOption) {
            if (opt !== undefined) {
                let self = this;
                self.css = opt.css;
                self.icon = opt.icon;
                self.text = opt.text;
                self.tooltip = opt.tooltip;
            }
        }
    }
    export class MediaOptionObservable {
        css:KnockoutObservable<string>;
        icon:KnockoutObservable<string>;
        text:KnockoutObservable<string>;
        state:KnockoutObservable<ControlState>;
        tooltip:KnockoutObservable<string>;
        isVisible:KnockoutComputed<boolean>;
        // props
        props:MediaOption;
        optionList:KnockoutObservableArray<IToggle>;
        propList:KnockoutObservableArray<KnockoutObservable<string>>;
        trackingState:KnockoutComputed<ControlState>;
        //
        bind(prop:KnockoutObservable<string>, data:IToggle, state:ControlState) {
            let self = this;
            prop(state === ControlState.On ? data.on : data.off);
            // self.isVisible(state!== ControlState.Disabled);
        }

        constructor(prop:MediaOption, state:ControlState) {
            let self = this;
            self.props = prop;
            //
            self.css = ko.observable("css");
            self.icon = ko.observable("icon");
            self.text = ko.observable("tes");
            self.tooltip = ko.observable("xtdd");
            //
            self.state = ko.observable(state);
            //
            self.propList = ko.observableArray([self.css, self.icon, self.text, self.tooltip]);
            self.optionList = ko.observableArray([self.props.css, self.props.icon, self.props.text, self.props.tooltip]);
            //
            let k = 0;
            ko.utils.arrayForEach(self.propList(), (prop:KnockoutObservable<string>) => {
                // console.log(prop, self.optionList()[k])
                console.log(prop());
                self.bind(prop, self.optionList()[k++], self.state());
            });
            //
            self.isVisible = ko.computed(function () {
                return self.state() !== ControlState.Disabled;
            }, self);
            //
            self.init();

        }

        init() {
            let self = this;
            self.trackingState = ko.computed(() => {
                let i = 0;
                ko.utils.arrayForEach(self.propList(), (prop) => {
                    self.bind(prop, self.optionList()[i++], self.state());
                });
                if (self.state() === ControlState.None) {
                    // self.isVisible(false);
                } else {
                    //self.isVisible(true);
                }
                return self.state();
            });
            if (self.state() === ControlState.None) {
                //self.isVisible(false);
            } else {
                // self.isVisible(true);
            }
        }
    }
    export class MediaControls {
        start:IMediaControl;
        startLinkItem:LinkItem;
        camera:IMediaControl;
        cameraLinkItem:LinkItem;
        microphone:IMediaControl;
        microphoneLinkItem:LinkItem;
        links:KnockoutObservableArray<LinkItem>;
        constructor() {
            let self = this;
            console.log("constructor")
            self.start = {
                event: "action:cast:start",
                state: ControlState.On,
                options: {
                    css: {
                        on: "green darken-1",
                        off: "warning-color"
                    },
                    icon: {
                        on: "material-icons",
                        off: "material-icons"
                    },
                    text: {
                        on: "cast",
                        off: "cast_connected"
                    },
                    tooltip: {
                        on: "start casting",
                        off: "stop casting"
                    }
                }
            };
            self.camera = {
                event: "camera",
                state: ControlState.Disabled,
                options: {
                    css: {
                        on: "green darken-1",
                        off: "warning-color"
                    },
                    icon: {
                        on: "material-icons",
                        off: "material-icons"
                    },
                    text: {
                        on: "videocam",
                        off: "videocam_off"
                    },
                    tooltip: {
                        on: "stop broadcasting",
                        off: "start broadcasting"
                    }
                }
            };
            self.microphone = {
                event: "microphone",
                state: ControlState.Disabled,
                options: {
                    css: {
                        on: "green darken-1",
                        off: "warning-color"
                    },
                    icon: {
                        on: "fa fa-microphone",
                        off: "fa fa-microphone-slash"
                    },
                    text: {
                        on: "",
                        off: ""
                    },
                    tooltip: {
                        on: "mute",
                        off: "un mute"
                    }
                }
            };
            self.startLinkItem = new LinkItem(self.start);
            self.cameraLinkItem = new LinkItem(self.camera);
            self.microphoneLinkItem = new LinkItem(self.microphone);
            self.links = ko.observableArray([self.cameraLinkItem, self.microphoneLinkItem, self.startLinkItem]);
        }
    }


    export class ComponentView {
        mediaControls:MediaControls;
        isConnected:KnockoutObservable<boolean>;
        constructor() {
            let self = this;
            self.isConnected = ko.observable(false);
            self.mediaControls = new MediaControls();
        }
        click(data:any) {
            let self = this;
            switch (data.event) {
                case ClickEvent.cast:
                    if (data.control.data.state() === ControlState.On) {
                        self.isConnected(true);
                        data.data.state(ControlState.Off);
                        self.mediaControls.links().forEach(function (item) {
                            if (item.event !== "action:cast:start") {
                                item.data.state(ControlState.On);
                            }
                        });
                    } else {
                        data.data.state(
                            ControlState.On);
                        self.isConnected(false);
                        self.mediaControls.links().forEach(function (item) {
                            if (item.event !== "action:cast:start") {
                                item.data.state(ControlState.Disabled);
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

        init() {
            let self = this;
            self.mediaControls.links().forEach(function (item) {
                if (item.event === "action:cast:start") {
                    self.mediaControls.links().forEach(function (link) {
                        link.data.state(ControlState.On);
                    });
                    item.data.state(ControlState.Disabled);
                }
            });
        }
    }
    // var app = window["app"] || {};
    // $(document).ready(function () {
    //     window["app"] = new ComponentView();
    //     console.warn(window["app"]);
    //     ko.applyBindings(window["app"]);
    //
    // });
}