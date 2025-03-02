import express from "express";
import { addIncome, deleteIncome, getIncome } from "../controllers/income.Controller.js"; // Import both controller functions

const router = express.Router(); // Create a router object for defining routes

// POST route → When a user sends data to /api/v1/money/add-income, the addIncome controller is called
router.post("/add-income", addIncome); 

// GET route → When a user sends a request to /api/v1/money/getIncome, the getIncome controller is called
router.get("/getIncome", getIncome);  // This will call the getIncome function

// DELETE route → Deletes an income by its ID
router.delete("/delete-income/:id", deleteIncome); // The :id in the route will pass the ID of the income to delete

// Export the router so that it can be used in the main app file (index.js)
export default router;
