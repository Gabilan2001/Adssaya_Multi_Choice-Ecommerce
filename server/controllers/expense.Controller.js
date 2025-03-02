// controllers/transaction/Controller.js

// Importing the Expense model which we use to interact with the expense collection in the MongoDB database
import ExpenseSchema from "../models/expenseModel.js"; // Assuming you have created expenseModel.js

// Controller function for the POST route to add a new expense
export const addExpense = async (req, res) => {
    // Destructuring the data from the request body (req.body)
    const { title, amount, category, description, date } = req.body;

    // Creating a new instance of the ExpenseSchema with the data we received from the client
    const expense = new ExpenseSchema({
        title,        // Title of the expense (e.g., "Rent")
        amount,       // Amount of the expense (e.g., 500)
        category,     // Category of the expense (e.g., "Rent", "Food")
        description,  // Description of the expense (e.g., "Monthly rent payment")
        date          // Date when the expense was paid
    });

    try {
        // Checking if the required fields (title, category, description, and date) are provided
        if (!title || !category || !description || !date) {
            return res.status(400).json({
                message: 'All fields are required'  // If any field is missing, send an error message
            });
        }

        // Saving the expense to the database using the `save()` method of the Mongoose model
        await expense.save();

        // If everything goes well, send a success response with a success message
        res.status(200).json({
            message: 'Expense added successfully',
            expense
        });

    } catch (error) {
        // If an error occurs while saving, send a failure response with the error message
        console.error(error);  // Log the error for debugging purposes
        res.status(500).json({
            message: 'Failed to add expense',
            error: error.message  // Send the actual error message in the response
        });
    }
};

// Controller function for the GET route to retrieve all expense records
export const getExpense = async (req, res) => {
    try {
        // Fetching all expense records from the database and sorting them by creation date in descending order
        const expense = await ExpenseSchema.find().sort({
            createdAt: -1  // -1 means descending order (newest first)
        });

        // Sending a successful response with the fetched expense data
        res.status(200).json(expense);

    } catch (error) {
        // If an error occurs, send a failure response with a server error message
        res.status(500).json({
            message: 'Server error'  // Generic error message if something goes wrong
        });
    }
};

// Controller function to delete expense by ID
export const deleteExpense = async (req, res) => {
    const { id } = req.params; // Get the expense ID from the request parameters

    try {
        // Attempt to find and delete the expense by ID
        const expense = await ExpenseSchema.findByIdAndDelete(id);

        // If expense is not found, return a 404 error
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Success: Return a success message
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        // Catch any errors that occur during the process
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
