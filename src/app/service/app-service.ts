import "reflect-metadata";
import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import { inject, injectable } from "inversify";
import { firebaseConfig } from "app/app";
import { Auth, getAuth } from "firebase/auth";
import Pubsub from "common/utils/PubSub";

export enum AppEvents {
  NEW_SIGN_IN = "NEW_SIGN_IN",
  SIGN_IN = "SIGN_IN",
}

@injectable()
class AppService {
  config = firebaseConfig;
  app: FirebaseApp;
  auth: Auth;
  @inject(Pubsub) public readonly appPubsub!: Pubsub<AppEvents>;

  constructor() {
    this.app = this.createApp();
    this.auth = this.createAuth();
  }

  private createApp() {
    try {
      return getApp();
    } catch {
      return initializeApp(this.config);
    }
  }

  private createAuth() {
    return getAuth(this.app);
  }
}

export default AppService;
