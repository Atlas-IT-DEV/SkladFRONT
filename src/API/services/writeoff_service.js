import { Instance } from "../instance";
import { writeoffsUrl } from "../apiConsts";
import { getToken } from "../helper/userCookie";

export default class WriteOffService {
  static getWriteoffs() {
    return Instance.get(writeoffsUrl, {
      headers: { Authorization: getToken() },
    });
  }

  static getWriteoff(writeoffId) {
    return Instance.get(`${writeoffsUrl}/${writeoffId}`, {
      headers: { Authorization: getToken() },
    });
  }

  static confirmWriteoff(writeoffId, comment) {
    return Instance.put(
      `${writeoffsUrl}/${writeoffId}?comment=${comment}`,
      null,
      {
        headers: { Authorization: getToken() },
      },
    );
  }

  static createWriteoff(writeoff) {
    return Instance.post(writeoffsUrl, writeoff, {
      headers: {
        Authorization: getToken(),
      },
    });
  }
}
