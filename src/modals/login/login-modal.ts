import { inject } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";

@inject(DialogController)
export class LoginModal {

  private username: string = null;

  constructor(private dc: DialogController) {
  }

  private okHandler() {

    if (this.username) {
      this.dc.close(true, this.username);
    }
  }

  private cancelHandler() {
    this.dc.cancel();
  }

}
