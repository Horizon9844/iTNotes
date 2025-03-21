const app = require('./app')
const cloudinary = require('cloudinary')
const connectDatabase = require('./config/database')

//hosting a Server 
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

//Handling uncaught exception
process.on('uncaughtException',(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    server.close(()=>{
        process.exit();
    })
})


//locating dotenv config file
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"})
}




//connecting to database
connectDatabase();


//cloudinary configuration
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
   })

 
//handling unhandled exception
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Rejection");
    server.close(()=>{
        process.exit();
    })
})