import mongoose from 'mongoose'
export const connectDB= async()=>{
    try{
      const connection=  await mongoose.connect(process.env.MONGODB_URI)
      console.log(`MongoDb connect succeffully on connection ${connection.connection.host }`)
    }
    catch(err){
console.log("MongoDb Connection Error",err)
    }
}