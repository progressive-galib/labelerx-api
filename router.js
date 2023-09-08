const express = require('express');
const router = express.Router();
const {
  getAllPhotos,
  getPhotoById,
  createPhoto,
  updateAnnotationStatus,
  updatePhotoDetails,
  deletePhoto,
  getUnannotatedPhoto,   // New route for serving unannotated photo
  getAnnotationDetails,  // New route for annotation details by ID
  getPhotoByFilename,    // New route for getting photo by filename
} = require('./photoController'); // Define your controller functions

// Define the API routes
router.get('/api/photos', getAllPhotos);
router.get('/api/photos/:id', getPhotoById);
router.post('/api/photos', createPhoto);
router.patch('/api/photos/:id/annotate', updateAnnotationStatus);
router.patch('/api/photos/:id', updatePhotoDetails);
router.delete('/api/photos/:id', deletePhoto);

// New route for serving an unannotated photo by lowest ID
router.get('/api/photos/unannotated', getUnannotatedPhoto);

// New route for annotation details by ID
router.get('/api/photos/:id/annotation-details', getAnnotationDetails);

// New route for getting a photo by filename
router.get('/api/photos/filename/:filename', getPhotoByFilename);

module.exports = router;
