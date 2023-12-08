import { Instance } from "./instance";

export default class ImageService {
  static async getImage(image) {
    return Instance.get(`/api/images/${image}`, {
      responseType: "arraybuffer",
    });
  }
}
