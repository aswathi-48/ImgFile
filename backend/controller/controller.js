const Model = require('../models/model');

// Upload controller
const uploadModel = async (req, res) => {
  try {
    const file = req.file;
    const newModel = new Model({
      filename: file.originalname,
      filepath: file.path,
    });

    await newModel.save();
    res.status(200).json({ message: 'Model uploaded', model: newModel });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
};

// Get all models
const getAllModels = async (req, res) => {
  try {
    const models = await Model.find().sort({ uploadedAt: -1 });
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed' });
  }
};

// Get single model by ID (optional)
const getModelById = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) return res.status(404).json({ error: 'Model not found' });
    res.json(model);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching model' });
  }
};

module.exports = {
  uploadModel,
  getAllModels,
  getModelById,
};