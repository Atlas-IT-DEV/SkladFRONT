import { Instance } from "./instance";

export default class TmcService {
  static async getTmcs() {
    return Instance.get("api/tmcs");
  }
}
