// 'use server'

// import axios from 'axios';
// import { v2 as cloudinary } from 'cloudinary';
// import sharp from 'sharp';
// import stream from 'stream';  // Import sharp for image processing

// // Function to generate the Cloudinary configuration

// const generateConfig = async () => {
  
//     const timestamp = Math.floor(Date.now() / 1000);

//     // Optional: Add other parameters like 'folder' if needed
//     const folder = 'vestiga/users';

//     // Prepare the string to sign for Cloudinary
//     const signatureString = `folder=${folder}&timestamp=${timestamp}`;
    
//     // Generate the signature using Cloudinary's API_SECRET
//     const signature = cloudinary.utils.api_sign_request(
//       { timestamp, folder }, // include 'folder' and 'timestamp' as part of the signature
//       process.env.CLOUDINARY_API_SECRET!
//     );

//     // API Key (public-facing)
//     const API_KEY = process.env.CLOUDINARY_API_KEY;

//     // The upload URL should use your cloud name (NOT the API key)
//     const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
//     const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

//     // Return the response with the necessary data
//     return {
//       uploadUrl,
//       signature,
//       timestamp,
//       API_KEY,
//       folder // Optional: Include the folder in the response if needed
//     };

  
// };

// // Function to upload image to Cloudinary with resizing
// export const uploadImage = async (file: File, folder: string = 'kokoku') => {
//   try {
//     // Generate the timestamp and signature
//     const { uploadUrl, signature, timestamp, API_KEY ,folder } = await generateConfig();

//     // Create form data
//     const formData = new FormData();
//     formData.append('file', file); // Add the file to the form data
//     formData.append('api_key', API_KEY || process.env.CLOUDINARY_API_KEY || ""); // Add Cloudinary API key
//     formData.append('timestamp', timestamp.toString()); // Add timestamp
//     formData.append('signature', signature ); // Add the signature
//     formData.append('folder', folder); // Optional: Add folder
    
//     const uploadResponse = await axios.post(uploadUrl, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     // Return the uploaded image URL from Cloudinary
//     return uploadResponse.data.secure_url;
//   } catch (error) {
//     console.error('Error uploading image to Cloudinary:', error);
//     throw new Error('Error uploading image');
//   }
// };


