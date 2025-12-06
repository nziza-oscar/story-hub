const multer = require('multer');
const path = require('path');

// Configure multer for memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|webp|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

// Middleware for single image upload
const uploadSingleImage = (fieldName) => upload.single(fieldName);

// Middleware for multiple images
const uploadMultipleImages = (fieldName, maxCount) => upload.array(fieldName, maxCount);

module.exports = {
  uploadSingleImage,
  uploadMultipleImages
};