// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import connectDB from "./db/connection.js";


dotenv.config({
    path: './env'
})


connectDB()
.then(() => {
        app.on("error",(error) => {
        console.log("ERRR: ",error);
        throw error
        })
        app.listen(process.env.PORT || 5000, () => { 
        console.log(`Server is listening at ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongo DB Connection Failed => ",err);
})
