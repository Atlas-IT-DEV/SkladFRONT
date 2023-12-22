import { Instance } from "../instance";
import { imagesUrl } from "../apiConsts";

//responseType: "blob",
export default class ImageService {
  static async getImage(image) {
    return Instance.get(`${imagesUrl}/${image}`, {
      responseType: "arraybuffer",
    });
  }
}
