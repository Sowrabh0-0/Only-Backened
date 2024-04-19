import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`);
        console.log(`\n Mongo DB is Connected !! DB_Host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Mongo DB Connection Failed ",error);
        process.exit(1); // Exit the app on db connection error
    }
}

export default connectDB;