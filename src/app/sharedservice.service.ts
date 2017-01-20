import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  public sharedvalue={signin:false,currentUser:null}
  constructor() { }

}
