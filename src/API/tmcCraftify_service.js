import { Instance } from "./instance";

export default class TmcCraftifyService {
  static async getTmcCraftifies() {
    return Instance.get("api/tmcCraftifies");
  }
}
