
import "toastr/build/toastr.css";
import "font-awesome/css/font-awesome.css";

import { PLATFORM } from "aurelia-pal";
import { RouterConfiguration, Router, Redirect } from 'aurelia-router';
import { autoinject } from 'aurelia-dependency-injection';

import { ToastrService } from 'aurelia-toolbelt';

import { AuthService } from './services/auth-service';

@autoinject()
export class App {

  private router: Router;
  public message: 'Hello World!';

  constructor(private ts: ToastrService) {


  }

  private configureRouter(config: RouterConfiguration, router: Router): void {

    this.router = router;

    config.title = 'Chat';
    config.addAuthorizeStep(AuthorizeStep);

    config.map([
      { route: ['login', ''], name: 'login', moduleId: PLATFORM.moduleName('./login/login'), nav: true, title: 'Login' }
      ,
      { route: 'chat-room', name: 'chat-room', moduleId: PLATFORM.moduleName('./chat/chat-room'), nav: true, title: 'Chat Room', settings: { auth: true } }
    ]);
  }
}


@autoinject()
class AuthorizeStep {

  constructor(private authService: AuthService) { }

  run(navigationInstruction, next) {

    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      if (!this.authService.isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}
