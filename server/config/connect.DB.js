// Import required modules
import mongoose from "mongoose"; // Mongoose is used to connect and interact with MongoDB
import dotenv from "dotenv"; // dotenv is used to load environment variables from a .env file

// Load environment variables from .env file
dotenv.config(); 

// Check if the MongoDB connection URI is provided in the .env file
if (!process.env.MONGODB_URI) {
    throw new Error("Please provide MongoDB URI in .env file");
    // If MONGODB_URI is missing, an error is thrown and the application stops running
}

// Define an asynchronous function to connect to MongoDB
async function connectDB() {
    try {
        // Attempt to connect to the MongoDB database using the provided URI
        await mongoose.connect(process.env.MONGODB_URI);

        // If connection is successful, log a message
        console.log("DB connected successfully");

    } catch (error) {
        // If connection fails, log the error message
        console.log("MongoDB connection error:", error);

        // Exit the application if the database connection fails
        process.exit(1);
    }
}
//-------------------arrofunction--------------------------------
// // Alternative way to connect to MongoDB using another function
// const db = async () => {
//     try {
//         // Disable strict query mode (optional, depends on Mongoose version)
//         mongoose.set('strictQuery', false);

//         // Attempt to connect to the MongoDB database
//         await mongoose.connect(process.env.MONGODB_URI);

//         // Log a success message if connected
//         console.log("DB connected");

//     } catch (error) {
//         // Log an error message if the connection fails
//         console.log("DB connection error:", error);
//     }
// };

//----------------------------------------------------------------s

// Export the `connectDB` function so it can be imported in other files
export default connectDB;
