
import "toastr/build/toastr.css";
import "font-awesome/css/font-awesome.css";


import { ToastrService } from 'aurelia-toolbelt';
import { inject } from 'aurelia-dependency-injection';

import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from "aurelia-pal";
@inject(ToastrService)
export class App {

  private router: Router;
  public message: 'Hello World!';

  constructor(private ts: ToastrService) {


  }

  private configureRouter(config: RouterConfiguration, router: Router): void {

    this.router = router;

    config.title = 'Chat';

    config.map([
      { route: ['login', ''], name: 'login', moduleId: PLATFORM.moduleName('./login/login'), nav: true, title: 'Login' }
      ,
      { route: 'chat-room', name: 'chat-room', moduleId: PLATFORM.moduleName('./chat/chat-room'), nav: true, title: 'Chat Room' }
    ]);
  }
}
