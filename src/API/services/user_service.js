import { Instance } from "../instance";
import { usersUrl } from "../apiConsts";

export default class UserService {
  static async signIn(username, password) {
    return Instance.post(`${usersUrl.users}/${usersUrl.signIn}`, {
      username,
      password,
    });
  }
  static async signUp(userSignUp) {
    return Instance.post(`${usersUrl.users}/${usersUrl.signUp}`, userSignUp);
  }
}
