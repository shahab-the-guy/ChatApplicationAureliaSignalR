import { Router } from "aurelia-router";
import { autoinject } from "aurelia-framework";
import { AuthService } from "services/auth-service";
import { EventAggregator } from "aurelia-event-aggregator";

import { ChatHubService } from "services/hubs/chat-hub-service";

@autoinject()
export class ChatRoom {

  private message: string = null;
  private messages = [];

  private hasFocus = true;

  constructor(private authService: AuthService, private router: Router, private chatService: ChatHubService, private ea: EventAggregator) { }

  private canActivate() {
    this.chatService.start().then(_ => {
      this.ea.subscribe("Message-Received", (data) => {
        this.messages.push(data);

      });
    });

  }

  private logout() {

    this.authService.logout().then(response => {
      this.router.navigateToRoute("login");
    });
  }

  private addMessage() {
    return new Promise(resolve => {
      this.chatService.sendMessage(this.message).then(res => {
        this.message = "";
        this.hasFocus = true;
        resolve(true);
      });
    });
  }

  detached() {
    // when we move out of this page we want it to stop
    this.chatService.stop();
  }

}
