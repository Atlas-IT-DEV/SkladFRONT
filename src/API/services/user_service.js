import { Instance } from "../instance";
import { usersUrl } from "../apiConsts";
import { setUser } from "../helper/userCookie/userCookie";

export default class UserService {
  static async signIn(username, password) {
    setUser(
      (
        await Instance.post(`${usersUrl.users}/${usersUrl.signIn}`, {
          username,
          password,
        })
      ).data,
    );
  }
}
