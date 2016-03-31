namespace  openTok.events {
    export class Flow {
        static sessionReady = "flow:sessionReady";
        static sessionAddScreen = "flow:sessionAddScreen";
        static sessionAddSubscriber = "flow:sessionAddSubscriber";
        static sessionSelectedItem = "flow:sessionSelectedItem";

        static publisherToggleAudio = "flow:session:publisher:ToggleAudio";
        static publisherToggleVideo = "flow:session:publisher:ToggleVideo";
    }
}