import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/public/temp")
    },
    filename: function (req, file, cb) {

        //this is to change the filename into unique id 
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)

        //saving as orginal filename because it will be stored tiny amount of time in the server
        // and it will be uploaded to the cloud storage (can be used the above one also if security requirements is there)
        cb(null,file.originalname)
    }
})

export const upload = multer({ 
    storage
})