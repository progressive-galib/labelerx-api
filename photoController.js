const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to get all photos
async function getAllPhotos(req, res) {
  try {
    const photos = await prisma.photo.findMany();
    res.json(photos);
  } catch (error) {
    console.error('Error getting all photos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get a photo by ID
async function getPhotoById(req, res) {
  const { id } = req.params;

  try {
    const photo = await prisma.photo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    res.json(photo);
  } catch (error) {
    console.error('Error getting photo by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to create a new photo
async function createPhoto(req, res) {
  const { path, filename, isAnnotated, width, height } = req.body;

  try {
    const newPhoto = await prisma.photo.create({
      data: {
        path,
        filename,
        isAnnotated,
        width,
        height,
      },
    });

    res.status(201).json(newPhoto);
  } catch (error) {
    console.error('Error creating a new photo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to update the annotation status of a photo
async function updateAnnotationStatus(req, res) {
  const { id } = req.params;
  const { isAnnotated } = req.body;

  try {
    const updatedPhoto = await prisma.photo.update({
      where: { id: parseInt(id) },
      data: { isAnnotated },
    });

    res.json(updatedPhoto);
  } catch (error) {
    console.error('Error updating annotation status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to update photo details
async function updatePhotoDetails(req, res) {
  const { id } = req.params;
  const { width, height } = req.body;

  try {
    const updatedPhoto = await prisma.photo.update({
      where: { id: parseInt(id) },
      data: { width, height },
    });

    res.json(updatedPhoto);
  } catch (error) {
    console.error('Error updating photo details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to delete a photo
async function deletePhoto(req, res) {
  const { id } = req.params;

  try {
    await prisma.photo.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get an unannotated photo by lowest ID
async function getUnannotatedPhoto(req, res) {
  try {
    const unannotatedPhoto = await prisma.photo.findFirst({
      where: { isAnnotated: false },
      orderBy: { id: 'asc' },
    });

    if (!unannotatedPhoto) {
      return res.status(404).json({ error: 'No unannotated photos found' });
    }

    res.json(unannotatedPhoto);
  } catch (error) {
    console.error('Error getting unannotated photo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get annotation details by ID
async function getAnnotationDetails(req, res) {
  const { id } = req.params;

  try {
    const photo = await prisma.photo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    const { width, height } = photo;
    res.json({ width, height });
  } catch (error) {
    console.error('Error getting annotation details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get a photo by filename
async function getPhotoByFilename(req, res) {
  const { filename } = req.params;

  try {
    const photo = await prisma.photo.findUnique({
      where: { filename },
    });

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    res.json(photo);
  } catch (error) {
    console.error('Error getting photo by filename:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get the count of annotated images for each class
async function getClassCounts(req, res) {
  try {
    const classes = await prisma.classes.findMany({
      include: {
        photos: {
          where: { isAnnotated: true },
        },
      },
    });

    const classCounts = classes.map((cls) => ({
      name: cls.name,
      count: cls.photos.length,
    }));

    res.json(classCounts);
  } catch (error) {
    console.error('Error getting class counts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to add a new class
async function addNewClass(req, res) {
  const { name } = req.body;

  try {
    const existingClass = await prisma.classes.findUnique({
      where: { name },
    });

    if (existingClass) {
      return res.status(400).json({ error: 'Class already exists' });
    }

    const newClass = await prisma.classes.create({
      data: { name },
    });

    res.status(201).json(newClass);
  } catch (error) {
    console.error('Error adding new class:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllPhotos,
  getPhotoById,
  createPhoto,
  updateAnnotationStatus,
  updatePhotoDetails,
  deletePhoto,
  getUnannotatedPhoto,
  getAnnotationDetails,
  getPhotoByFilename,
  getClassCounts,
  addNewClass,
};
