import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = aync( localFilepath) => {

  try{
      if(!localFilePath) return null;
      cloudinary.uploader.upload(localFilepath, {
       resource_type:"auto"
    });
    console.log("file has been uploaded on cloudinary",
    response.url);
    return response;
  }
  catch(error){
    fs.unlinkSync(localFilePath)
    return null;
  }
}

export {uploadOnCloudinary}

cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });