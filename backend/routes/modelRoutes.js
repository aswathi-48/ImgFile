// const express = require('express');
// const multer = require('multer');
// const {
//   uploadModel,
//   getAllModels,
//   getModelById,
// } = require('../controller/controller');

// const router = express.Router();

// // Configure multer for file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });
// const upload = multer({ storage });

// // Routes
// router.post('/upload', upload.single('model'), uploadModel);
// router.get('/', getAllModels);
// router.get('/:id', getModelById);

// module.exports = router;






const express = require('express');
const multer = require('multer');
const {
  uploadModel,
  getAllModels,
  getModelById,
} = require('../controller/controller');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['model/gltf-binary'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .glb files are allowed!'));
    }
  },
  // limits: { fileSize: 10 * 1024 * 1024 },
});

router.post('/upload', upload.single('model'), uploadModel);
router.get('/', getAllModels);
router.get('/:id', getModelById);

module.exports = router;
