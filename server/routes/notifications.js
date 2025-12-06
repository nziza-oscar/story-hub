const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController');
const auth = require("../middleware/authenticate")

router.get('/', auth, NotificationController.getUserNotifications);

// Mark one notification as read
router.patch('/:id/read',auth, NotificationController.markAsRead);
router.patch('/user/read-all',auth, NotificationController.markAllAsRead);
router.delete('/:id',auth, NotificationController.deleteNotification);

module.exports = router;
