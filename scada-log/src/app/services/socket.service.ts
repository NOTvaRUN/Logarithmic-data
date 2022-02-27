import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }
  public json = {
    client: 'hello'
  }
  connect(){
    const ws = new WebSocket('wss://localhost:8443');

    ws.onmessage = (e)=>{
      setTimeout(()=>{
        ws.send((Math.random() * 100).toString())
      },1000)
    }
    // const subject = webSocket("wss://localhost:8443");
    // // subject.next(JSON.stringify(this.json));

    // subject.subscribe(
    //    msg => {
    //     setTimeout(()=>{
    //       // subject.next(JSON.stringify(this.json));
    //     },1000)
    //     console.log(msg)
    //    }, // Called whenever there is a message from the server.
    //    err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
    //    () => console.log('complete') // Called when connection is closed (for whatever reason).
    //  );
  }

}
