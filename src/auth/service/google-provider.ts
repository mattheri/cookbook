import AppService, { AppEvents } from "app/service/app-service";
import {
  AuthError,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
class GoogleProvider {
  @inject(AppService) private readonly appService!: AppService;

  constructor() {}

  private get provider() {
    return new GoogleAuthProvider();
  }

  private get auth() {
    return this.appService.auth;
  }

  private get pubsub() {
    return this.appService.appPubsub;
  }

  private async withPopup() {
    try {
      const user = await signInWithPopup(this.auth, this.provider);
      const isNew = !!getAdditionalUserInfo(user)?.isNewUser;
      const event = isNew ? AppEvents.NEW_SIGN_IN : AppEvents.SIGN_IN;
      this.pubsub.publish(event, user.user.uid);
    } catch (e) {
      const error = e as AuthError;

      console.error({
        cause: error.cause,
        message: error.message,
        name: error.name,
        code: error.code,
        stack: error.stack,
      });
    }
  }

  private async withRedirect() {
    try {
      await signInWithRedirect(this.auth, this.provider);
    } catch (e) {
      const error = e as AuthError;

      console.error({
        cause: error.cause,
        message: error.message,
        name: error.name,
        code: error.code,
        stack: error.stack,
      });
    }
  }

  get signIn() {
    return {
      withPopup: this.withPopup.bind(this),
      withRedirect: this.withRedirect.bind(this),
    };
  }
}

export default GoogleProvider;
