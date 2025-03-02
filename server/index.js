// Importing necessary modules
import dotenv from 'dotenv';  // Loads environment variables from .env file
import express from 'express'; // Express framework for building the web server
import cors from 'cors';       // Middleware to handle Cross-Origin Resource Sharing (CORS)
import cookieParser from 'cookie-parser'; // Middleware to parse cookies from incoming requests
import morgan from 'morgan';   // HTTP request logger middleware for debugging
import helmet from 'helmet';   // Middleware for setting various HTTP security headers
import connectDB from './config/connect.DB.js'; // Importing the function that connects to MongoDB
import transaction from "./routes/transaction.rout.js"//import transaction rout from the transaction file
import expense from './routes/expense.rout.js';
import userRouter from './routes/user.route.js';
// Load environment variables from the .env file
dotenv.config();

// Create an instance of an Express application
const app = express();

// Define the port number for the server to listen on
// If process.env.PORT is not defined, it defaults to 8000
const PORT = process.env.PORT || 8000; 

// ------------------- Middleware Setup -------------------

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// CORS (Cross-Origin Resource Sharing) configuration
app.use(cors({
    credentials: true, // Allows cookies to be sent from the frontend
    origin: process.env.FRONT_END_URL // The frontend URL (set in .env file)
}));

// Middleware to parse cookies from incoming HTTP requests
app.use(cookieParser());

// Logging middleware that logs each HTTP request in a 'dev' format (useful for debugging)
app.use(morgan('dev'));

// Security middleware that helps protect the app from common web vulnerabilities
app.use(helmet({
    crossOriginResourcePolicy: false // Allows cross-origin resource sharing (CORS) for external resources
}));

// ------------------- Define Routes -------------------

// Simple GET route for the root URL ("/")
// When a request is made to "/", it sends a JSON response
app.get("/", (req, res) => {
    res.json({
        message: `Server is running on port ${PORT}`
    });
});

 

app.use("/api/money",transaction)
app.use("/api/expense",expense)
app.use("/api/user/",userRouter)//this user route come from user route file it is in the rout folder
//userRouter.post('/register',registerUserController)  in hear the first i give the user Rout this is add in the user
   
// ------------------- Database Connection & Server Start -------------------

// Attempt to connect to MongoDB first before starting the server
connectDB().then(() => {

    // ------------------ Reason for Starting Server After DB Connection ------------------
    // - If the server starts before connecting to MongoDB, any request requiring a database operation 
    //   (such as fetching or inserting data) will fail because the database is not yet connected.
    // - To prevent this, we wait for the database connection before starting the server.

    // Start the Express server and make it listen on the specified port
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}).catch(error => {
    // If there's an error connecting to MongoDB, log the error and exit the process
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process with failure code 1
});
