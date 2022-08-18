import { NextOrObserver, onAuthStateChanged, User } from "firebase/auth";
import { inject, injectable } from "inversify";
import AppService from "../../app/service/app-service";
import GoogleProvider from "./google-provider";
import LocalProvider from "./local-provider";

export enum AppEvents {
  NEW_SIGN_IN = "NEW_SIGN_IN",
}

@injectable()
class AuthService {
  @inject(AppService) private readonly appService!: AppService;
  @inject(LocalProvider) private readonly localProvider!: LocalProvider;
  @inject(GoogleProvider) private readonly googleProvider!: GoogleProvider;

  get pubsub() {
    return this.appService.appPubsub;
  }

  get auth() {
    return this.appService.auth;
  }

  get isConnected() {
    return !!this.auth.currentUser;
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  get LOCAL() {
    return this.localProvider;
  }

  get GOOGLE() {
    return this.googleProvider;
  }

  public onAuthStateChange = (nextOrObserver: NextOrObserver<User>) =>
    onAuthStateChanged(this.auth, nextOrObserver);

  public async signout() {
    await this.auth.signOut();
  }
}

export default AuthService;
