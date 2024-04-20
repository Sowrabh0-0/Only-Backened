import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(
    {
        userName:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase:true,
            index:true
        },
        fullname:{
            type: String,
            required:[true, "Add your Full name"],
            trim: true,
        },
        userEmail:{
            tyype: String,
            required: [true,"Why no email?"],
            unique: true
        },
        userMobileNumber:{
            type: true,
            required: [true,'Why you don`t have a mobile number?'],
            unique: true,
            index:true
        },
        userPassword:{
            type:String,
            required: [true,'You must set a password']   
        },
        refreshToken:{
            type:String
        }
    },
    {
        timestamps: true // Saves createdAt and updatedAt values
    }
)



userSchema.pre(
    "save", async function (next){
        if (!this.isModified("password")) return next();

        this.password = bcrypt.hash(this.password, 12);
        next()
    }
)

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            userName: this.userName,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const  User = mongoose.model("User", userSchema);