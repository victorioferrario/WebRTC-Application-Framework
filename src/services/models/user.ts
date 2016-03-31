module openTok.models {
  export class User {
    id: string;
    name: string;
    constructor(id: string, name: string){
      let self = this;
      self.id = id;
      self.name = name;
    }
  }
  export enum WebRtcUserType {
        None = 0,
            Moderator = 1,
            Student = 2,
            StudentWithNoCamera = 3
    }
}
