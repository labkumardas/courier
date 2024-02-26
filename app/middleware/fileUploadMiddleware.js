"use strict";
import fs from 'fs';
 
const handleUpload = async (req, res, next) => {
    console.log(req.files);
  
  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.status(400).json({ error: 'No file was uploaded.' });
  // }

  const documents = Object.values(req.files).flat();

  if (!documents || !Array.isArray(documents)) {
      return res.status(400).json({ error: 'Invalid file field.' });
  }
  const errors = [];
  const uploadFolder = './public/uploads'; // Change this to your desired folder path
  const uploadedFiles = [];

  // Create the "uploads" folder if it doesn't exist
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
  }

  // Function to move a file and return a promise
  const moveFile = (file, newPath) => {
    return new Promise((resolve, reject) => {
      file.mv(newPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            name: file.name,
            size: file.size,
            mimetype: file.mimetype,
            path: newPath,
            url: `/uploads/${file.name}`, // Construct the URL
          });
        }
      });
    });
  };

  // Validate and move each file
  try {
    const allowedTypes =['image/jpeg', 'image/png', 'image/pdf', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of documents) {
      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.name}`);
      } else if (file.size > maxSize) {
        errors.push(`File too large: ${file.name}`);
      } else {
        const newPath = `${uploadFolder}/${file.name}`;
        const result = await moveFile(file, newPath);
        uploadedFiles.push(result);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    req.uploadedFiles = uploadedFiles;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error moving file to destination.' });
  }
};
export default handleUpload;
