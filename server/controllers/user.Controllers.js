import sendEmail from "../config/sendEmail.js";  // Function to send emails
import usermodel from "../models/user.model.js"; // User schema (database model)
import bcryptjs from "bcryptjs"; // Library to hash passwords
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js"; // HTML template for the email
import { response, text } from "express";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";

// Function to register a new user
export async function registerUserController(req, res) {
    try {
        // Extract name, email, and password from the request body
        const { name, email, password } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide name, email, and password",
                error: true,
                success: false
            });
        }

        // Check if the email is already registered
        const user = await usermodel.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "Email is already registered",
                error: true,
                success: false
            });
        }

        // Generate a salt and hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user object
        const newUser = new usermodel({
            name,
            email,
            password: hashedPassword
        });

        // Save the new user in the database
        const savedUser = await newUser.save();

        // Generate verification email URL
        const verifyEmailUrl = `${process.env.FRONT_END_URL}/verify-email?code=${savedUser._id}`;

        // Send verification email
        await sendEmail({
            sendTo: email,
            subject: "Verify Your Email - MONEY",
            html: verifyEmailTemplate({ name, url: verifyEmailUrl })
        });

        // Send success response
        return res.status(201).json({
            message: "User registered successfully. Please check your email for verification.",
            error: false,
            success: true,
            data: savedUser
        });

    } catch (error) {
        // Handle any errors
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}



// Function to verify a user's email
export async function verifyEmailController(req, res) {
    try {
        // Extract the verification code from the request body
        const { code } = req.body;

        // Check if the `code` is provided in the request
        if (!code) {
            return res.status(400).json({
                message: "Verification code is required",
                error: true,
                success: false
            });
        }

        // Find the user in the database using the provided verification code (user's ID)
        const user = await usermodel.findOne({ _id: code });

        // If no user is found, return an error response
        if (!user) {
            return res.status(400).json({
                message: "Invalid verification code",
                error: true,
                success: false
            });
        }

        // Update the user's email verification status to `true`
        const updatedUser = await usermodel.updateOne({ _id: code }, {
            verify_email:true
        })      
      //----------------------------------------------------------------------------------------------------
    //   const updateUser = await usermodel.findOneAndUpdate(
    //     { _id: code }, 
    //     { verify_email: true }, 
    //     { new: true } // Returns the updated document
    // );


    // ✔ Use updateOne() if you just need to update the document without returning it.
    // ✔ Use findOneAndUpdate() if you need to get the updated document after updating.
    
    //--------------------------------------------------------------------------------------------------------
        

        // Send a success response to the client
        return res.json({
            message: "Email verified successfully!",
            error: false,
            success: true
        });

    } catch (error) {
        // Catch and handle any server errors
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}



//function for  login constructer
export async function loginController(req,res) {
    try {
        const {email,password}=req.body

        const user=await usermodel.findOne({email})//in heat which user email match it is get all the detail  will be get which is model like
         if(!user){
            return res.status(400).json({
                message : "user not register",
                error : true,
                success : false
            })
         }

         if(user.status !== "Active"){
            return response.status(400).json({
                message: "contact to Admin",
                error:true,
                success : false
            })
         }

         const checkPassword = await bcryptjs.compare(password,user.password)//first parameter fron get the youder input the secound my encriped password

         if(!checkPassword){
            return res.status(400).json({
                message : "check your password",
                error : true,
                success:false
            })
         }

         const accesstoken = await generatedAccessToken(user._id)
         const refreshToken = await generatedRefreshToken(user._id)

         
    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error :true,
            success:false
        })
    }
    
}

