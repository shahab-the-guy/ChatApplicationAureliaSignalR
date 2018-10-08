import { singleton, autoinject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";

import { HubConnectionBuilder, LogLevel, HubConnection } from '@aspnet/signalr';

import { AuthService } from "../auth-service";

@singleton()
@autoinject()
export class ChatHubService {


  private connection: HubConnection;

  constructor(private authService: AuthService, private ea: EventAggregator) {
    this.connection = new HubConnectionBuilder()
      .withUrl('/chat')
      .configureLogging(LogLevel.Information)
      .build();

    this.connection.on("updateMessages", (data) => this.notifier(data));
  }

  public start() {
    return this.connection.start().catch(err => console.error(err.toString()));
  }
  public stop() {
    return this.connection.stop();
  }

  public sendMessage(message: string) {
    return this.connection.invoke("Send", this.authService.username, message);
  }

  private notifier(data: any) {
    console.log(data);
    this.ea.publish("Message-Received", data);
  }

}
