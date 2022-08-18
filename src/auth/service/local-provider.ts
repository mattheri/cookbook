import AppService, { AppEvents } from "app/service/app-service";
import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updatePassword,
  reauthenticateWithCredential,
  User,
  AuthErrorCodes,
} from "firebase/auth";
import { inject, injectable } from "inversify";

interface Credentials {
  email: string;
  password: string;
}

@injectable()
class LocalProvider {
  @inject(AppService) private readonly appService!: AppService;

  private get auth() {
    return this.appService.auth;
  }

  private get pubsub() {
    return this.appService.appPubsub;
  }

  public async signIn({ email, password }: Credentials) {
    try {
      const { user } = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.pubsub.publish(AppEvents.SIGN_IN, user.uid);
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

  public async signUp({ email, password }: Credentials) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.pubsub.publish(AppEvents.NEW_SIGN_IN, user.uid);
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

  public async resetPassword(code: string, newPassword: string) {
    try {
      await confirmPasswordReset(this.auth, code, newPassword);
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

  public async sendPasswordResetEmail(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
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

  public async changePassword(user: User, newPassword: string) {
    try {
      await updatePassword(user, newPassword);
    } catch (e) {
      const error = e as AuthError;

      if (error.code === AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN) {
        //todo await reauthenticateWithCredential
      }

      console.error({
        cause: error.cause,
        message: error.message,
        name: error.name,
        code: error.code,
        stack: error.stack,
      });
    }
  }
}

export default LocalProvider;
