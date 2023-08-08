const cloudinary = require('cloudinary').v2;

// Cloudinary configuration using your API credentials
cloudinary.config({
  cloud_name: 'dmsosw5zj',
  api_key: '537966574196114',
  api_secret: 'QCg60FApt7krS2GD2wRNn0QAASk',
});

module.exports = cloudinary;