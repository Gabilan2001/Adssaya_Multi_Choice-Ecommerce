import express from "express";
import { addExpense, deleteExpense, getExpense } from "../controllers/expense.Controller.js"; // Import controller functions for expenses

const router = express.Router(); // Create a router object for defining routes

// POST route → When a user sends data to /api/v1/money/add-expense, the addExpense controller is called
router.post("/add-expense", addExpense); 

// GET route → When a user sends a request to /api/v1/money/getExpense, the getExpense controller is called
router.get("/getExpense", getExpense);  // This will call the getExpense function

// DELETE route → Deletes an expense by its ID
router.delete("/delete-expense/:id", deleteExpense); // The :id in the route will pass the ID of the expense to delete

// Export the router so that it can be used in the main app file (index.js)
export default router;
