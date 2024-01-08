import { Instance } from "../instance";
import { imagesUrl } from "../apiConsts";
import { getToken } from "../helper/userCookie";

//responseType: "blob",
export default class ImageService {
  static getImage(image) {
    return Instance.get(`${imagesUrl}/${image}`, {
      responseType: "blob",
      headers: { Authorization: getToken() },
    });
  }
}
