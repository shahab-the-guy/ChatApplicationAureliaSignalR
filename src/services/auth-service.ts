import { singleton } from "aurelia-framework";


@singleton()
export class AuthService {

  private loggedInKey: string = "logged-in";

  public login(username: string): Promise<boolean> {

    return new Promise(resolve => {

      localStorage.setItem(this.loggedInKey, username);
      resolve(true);
    });

  }

  public get isLoggedIn(): boolean {
    return localStorage.getItem(this.loggedInKey) ? true : false;
  }

  public get username() {
    return localStorage.getItem(this.loggedInKey);
  }

  public logout(): Promise<boolean> {
    return new Promise(resolve => {
      localStorage.removeItem(this.loggedInKey);
      resolve(true);
    });
  }
}
