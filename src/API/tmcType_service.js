import { Instance } from "./instance";

export default class TmcTypeService {
  static async getTmcTypes() {
    return Instance.get("api/tmctypes");
  }
}
