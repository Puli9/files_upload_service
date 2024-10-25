const express = require('express');
const router = express.Router();
const File = require('../models/File');
const upload = require('../middleware/upload');
const fs = require('fs').promises;
const path = require('path');

// Upload file
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const file = new File({
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: `uploads/${req.file.filename}` 
      });
  
      await file.save();
      res.status(201).json({
        message: 'File uploaded successfully',
        file: {
          id: file._id,
          filename: file.filename,
          originalName: file.originalName,
          size: file.size,
          uploadedAt: file.uploadedAt
        }
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Error uploading file' });
    }
  });

// Download file
router.get('/download/:id', async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
  
      // Construct the correct file path
      const filePath = path.join(__dirname, '../../uploads', file.filename);
      
      // Check if file exists
      try {
        await fs.access(filePath);
      } catch (error) {
        return res.status(404).json({ error: 'File not found on server' });
      }
  
      res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
      res.setHeader('Content-Type', file.mimeType);
      
      // Send file
      res.sendFile(filePath);
    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({ error: 'Error downloading file' });
    }
  });
  

// Delete file
router.delete('/delete/:id', async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
  
      // Construct the correct file path
      const filePath = path.join(__dirname, '../../uploads', file.filename);
      
      // Delete file from filesystem
      try {
        await fs.unlink(filePath);
      } catch (error) {
        console.error('File delete error:', error);
        // Continue with metadata deletion even if file is not found
      }
  
      // Delete metadata from database
      await File.findByIdAndDelete(req.params.id);
  
      res.json({ message: 'File deleted successfully' });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Error deleting file' });
    }
  });

// Get all files
router.get('/files', async (req, res) => {
  try {
    const files = await File.find().select('-path');
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving files' });
  }
});

module.exports = router;