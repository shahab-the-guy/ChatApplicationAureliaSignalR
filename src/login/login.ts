import { inject, autoinject } from "aurelia-framework";
import { DialogService } from "aurelia-dialog";
import { LoginModal } from "modals/login/login-modal";
import { AuthService } from "services/auth-service";
import { Router, RouterConfiguration } from "aurelia-router";

@autoinject()
export class Login {

  constructor(private ds: DialogService, private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn) {
      this.navigateToChatRoom();
    }
  }

  navigateToChatRoom(): any {
    this.router.navigateToRoute("chat-room");
  }

  private showLoginForm() {

    return new Promise(resolve => {

      this.ds.open({
        viewModel: LoginModal

      }).whenClosed(res => {

        if (!res.wasCancelled) {
          let loggedIn = this.authService.login(res.output);

          if (loggedIn) {
            this.navigateToChatRoom();
          }
        }

        resolve(true);

      });
    });
  }

}
