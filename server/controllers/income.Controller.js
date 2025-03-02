// controllers/transaction/Controller.js

// Importing the Income model which we use to interact with the income collection in the MongoDB database
import IncomeSchema from "../models/incomeModel.js";

// Controller function for the POST route
export const addIncome = async (req, res) => {
    // Destructuring the data from the request body (req.body)
    const { title, amount, category, description, date } = req.body;

    // Creating a new instance of the IncomeSchema with the data we received from the client
    const income = new IncomeSchema({
        title,        // Title of the income (e.g., "Salary")
        amount,       // Amount of the income (e.g., 1000)
        category,     // Category of the income (e.g., "Salary", "Freelance")
        description,  // Description of the income (e.g., "Monthly Salary")
        date          // Date when the income was received
    });

    try {
        // Checking if the required fields (title, category, description, and date) are provided
        if (!title || !category || !description || !date) {
            return res.status(400).json({
                message: 'All fields are required'  // If any field is missing, send an error message
            });
        }

        // Saving the income to the database using the `save()` method of the Mongoose model
        await income.save();

        // If everything goes well, send a success response with a success message
        res.status(200).json({
            message: 'Income added successfully',
            // Optionally, you can also include the saved income data in the response
             income
        });

    } catch (error) {
        // If an error occurs while saving, send a failure response with the error message
        console.error(error);  // Log the error for debugging purposes
        res.status(500).json({
            message: 'Failed to add income',
            error: error.message  // Send the actual error message in the response
        });
    }

    console.log(income);  // This is just for debugging, can be removed when not needed
};


// Controller function for the GET route to retrieve all income records
export const getIncome = async (req, res) => {
    try {
        // Fetching all income records from the database and sorting them by creation date in descending order
        const income = await IncomeSchema.find().sort({
            createdAt: -1  // -1 means descending order (newest first)
        });

        // Sending a successful response with the fetched income data
        res.status(200).json(income);

    } catch (error) {
        // If an error occurs, send a failure response with a server error message
        res.status(500).json({
            message: 'Server error'  // Generic error message if something goes wrong
        });
    }
};

// Controller function to delete income by ID
export const deleteIncome = async (req, res) => {
    const { id } = req.params; // Get the income ID from the request parameters

    try {
        // Attempt to find and delete the income by ID
        const income = await IncomeSchema.findByIdAndDelete(id);

        // If income is not found, return a 404 error
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        // Success: Return a success message
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        // Catch any errors that occur during the process
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
