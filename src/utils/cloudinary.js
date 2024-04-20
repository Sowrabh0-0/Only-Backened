import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
);

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return console.log("Couldn't Find the Path of the file")
        //upload the file on the cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        //File has been Successfully Uploaded
        console.log("The file is Uploaded on the Cloudinary",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)  //Removes the Locally saved tempory file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary}