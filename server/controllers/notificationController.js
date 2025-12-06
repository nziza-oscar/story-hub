// controllers/notificationController.js
const NotificationService = require('../services/notificationService');

// GET /notifications/:userId
const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const offset = (page - 1) * limit;

    const notifications = await NotificationService.getForUserWithNotifiable(
      userId,
      { limit, offset }
    );

    res.json({
      meta: { page, limit, count: notifications.length },
      data: notifications
    });
  } catch (err) {
    console.error('getUserNotifications', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /notifications/:id/read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const n = await NotificationService.markAsRead(id);

    if (!n) return res.status(404).json({ message: 'Notification not found' });

    
    res.json({ message: 'Marked as read' });
  } catch (err) {
    console.error('markAsRead', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const markAsUnread = async (req, res) => {
  try {
    const { id } = req.params;
    const n = await NotificationService.markAsUnread(id);

    if (!n) return res.status(404).json({ message: 'Notification not found' });

    n.dataValues.notifiable = await n.getNotifiable().catch(() => null);

    res.json({ message: 'Marked as unread', notification: n });
  } catch (err) {
    console.error('markAsUnread', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const { userId } = req;

    const updatedCount = await NotificationService.markAllAsRead(userId);

    res.json({ message: 'All notifications marked as read', updatedCount });
  } catch (err) {
    console.error('markAllAsRead', err);
    res.status(500).json({ message: 'Server error' });
  }
}



// DELETE /notifications/:id
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const ok = await NotificationService.delete(id);

    if (!ok) return res.status(404).json({ message: 'Notification not found' });

    res.json({ message: 'Notification deleted' });
  } catch (err) {
    console.error('deleteNotification', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /notifications/create
const createNotification = async (req, res) => {
  try {
    const { userId, notifiableId, notifiableModelName, type, message, data } = req.body;

    const notification = await NotificationService.notify({
      userId,
      notifiableId,
      notifiableModelName,
      type,
      message,
      data
    });

    notification.dataValues.notifiable = await notification
      .getNotifiable()
      .catch(() => null);

    res.status(201).json({ message: 'Notification created', notification });
  } catch (err) {
    console.error('createNotification', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserNotifications,
  markAsRead,
  markAsUnread,
  markAllAsRead,
  deleteNotification,
  createNotification
};
