import { Instance } from "../instance";
import { writeoffsUrl } from "../apiConsts";

export default class WriteoffService {
  static async getWriteoffs() {
    return Instance.get(writeoffsUrl);
  }

  static async getWriteoff(writeoffId) {
    return Instance.get(`${writeoffsUrl}/${writeoffId}`);
  }

  static async updateWriteoff(writeoffId, comment) {
    return Instance.put(`${writeoffsUrl}/${writeoffId}?comment=${comment}`);
  }

  static async createWriteoff(writeoff) {
    return Instance.post(writeoffsUrl, writeoff);
  }
}
