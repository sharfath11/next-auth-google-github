import mongoose from "mongoose";
export const DbConnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI!)
        
        
    }
    catch(error){
        throw new Error("connection filed")
    }
}
