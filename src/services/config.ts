module openTok{
    export class Config {
        //Params: container references.
        static app_users = ".users";
        static app_share = ".share";

        //@param: instance, Of Subscriber
        static instance = "instance";
        static instance_name = "instance-name";
        static instance_wrapper = "instance-wrapper";

        //@param: camera_publisher
        static camera_publisher = "camera-publisher";
        static camera_publisher_options = {
           width: 220,
           height: 160,
           publishVideo: true,
           publishAudio: false};

       //@param: camera_subscriber
       static camera_subscriber = "camera-subscriber";
       static camera_subscriber_options = {
           width: 150,
           height: 90
       };

      //@param: screen_subscriber for screen sharing.
       static screen_subscriber = "screen-subscriber";
    }
}
