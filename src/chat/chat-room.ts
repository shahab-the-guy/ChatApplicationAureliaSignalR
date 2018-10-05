import { autoinject } from "aurelia-framework";
import { AuthService } from "services/auth-service";
import { Router } from "aurelia-router";
import { resolve } from "path";
import { ChatHubService } from "services/hubs/chat-hub-service";
import { EventAggregator } from "aurelia-event-aggregator";


@autoinject()
export class ChatRoom {


  private message: string = null;
  private messages = [];

  private hasFocus = true;

  constructor(private authService: AuthService, private router: Router, private chatService: ChatHubService, private ea: EventAggregator) { }

  private canActivate() {
    if (!this.authService.isLoggedIn) {
      this.unAuthorized();
      return;
    }

    this.chatService.start().then(_ => {
      this.ea.subscribe("Message-Received", (data) => {
        this.messages.push(data);

      });
    });

  }

  private unAuthorized(): any {
    this.router.navigateToRoute("login");
  }

  private logout() {

    this.authService.logout().then(response => {
      this.unAuthorized();
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
