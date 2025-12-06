// services/notificationService.js
const { Notification, sequelize } = require('../models');

/**
 * NotificationService
 * - notify: create a notification for a user about some notifiable model (Post, Comment, User, etc)
 * - getForUserWithNotifiable: load notifications and attach `notifiable` (resolved polymorphic model)
 * - markAsRead / markAsUnread / markAllAsRead / delete
 *
 * NOTE: notifiableModelName must match the model name used in Notification.notifiable_type
 * (e.g. 'Post', 'Comment', 'User') and must have associations declared in the Notification model:
 * Notification.belongsTo(models.Post, { as: 'post', scope: { notifiable_type: 'Post' }})
 */
class NotificationService {
  
  static async notify({
    userId,
    notifiableId = null,
    notifiableModelName = null,
    type = 'system',
    message = '',
    data = null
  }) {
    const payload = {
      user_id: userId,
      type,
      notifiable_id: notifiableId,
      notifiable_type: notifiableModelName,
      message,
      data
    };

    console.log(payload)

    // Optionally wrap in transaction if you want to create other side-effects
    const notification = await Notification.create(payload);
    return notification;
  }

 
  static async getForUserWithNotifiable(userId, { limit = 50, offset = 0 } = {}) {
    const notifications = await Notification.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
      limit,
      offset
    });

    // attach resolved notifiable (calls getNotifiable() implemented on model)
    // This is simple but causes N queries for N notifications (N+1 problem).
    // For small pages (e.g. 20) it's acceptable. See performance note below.
    await Promise.all(notifications.map(async (n) => {
      try {
        const related = await n.getNotifiable();
        n.dataValues.notifiable = related || null;
      } catch (err) {
        // If association missing, set null but don't throw
        n.dataValues.notifiable = null;
      }
    }));

    return notifications;
  }

  static async markAsRead(notificationId) {
    const n = await Notification.findByPk(notificationId);
    if (!n) return null;
    n.is_read = true;
    await n.save();
    return n;
  }

  static async markAsUnread(notificationId) {
    const n = await Notification.findByPk(notificationId);
    if (!n) return null;
    n.is_read = false;
    await n.save();
    return n;
  }

  static async markAllAsRead(userId) {
    const [count] = await Notification.update(
      { is_read: true },
      { where: { user_id: userId, is_read: false } }
    );
    return count; // number of rows updated
  }

  static async delete(notificationId) {
    const n = await Notification.findByPk(notificationId);
    if (!n) return null;
    await n.destroy();
    return true;
  }
}

module.exports = NotificationService;
