import { usersUrl } from "../apiConsts";
import { Instance } from "../instance";
import { getToken } from "../helper/userCookie";

export default class UserService {
  static signIn(username, password) {
    return Instance.post(`${usersUrl.users}/${usersUrl.signIn}`, {
      username,
      password,
    });
  }
  static signUp(userSignUp) {
    return Instance.post(`${usersUrl.users}/${usersUrl.signUp}`, userSignUp, {
      headers: { Authorization: getToken() },
    });
  }
  static me(token) {
    return Instance.get(`${usersUrl.users}/${usersUrl.me}`, {
      headers: { Authorization: getToken() || `Bearer ${token}` },
    });
  }
}
