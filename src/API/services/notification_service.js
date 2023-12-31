import { Instance } from "../instance";
import { notificationsUrl } from "../apiConsts";
import { getToken } from "../helper/userCookie";

export default class NotificationService {
  static async getNotifications() {
    return Instance.get(`${notificationsUrl}`, {
      headers: { Authorization: getToken() },
    });
  }

  static async createNotification(transfer) {
    return Instance.post(`${notificationsUrl}`, transfer, {
      headers: { Authorization: getToken() },
    });
  }

  static async confirmNotification(notificationId) {
    return Instance.post(`${notificationsUrl}/${notificationId}`, null, {
      headers: { Authorization: getToken() },
    });
  }

  static async deleteNotification(notificationId) {
    return Instance.delete(`${notificationsUrl}/${notificationId}`, {
      headers: { Authorization: getToken() },
    });
  }
}
