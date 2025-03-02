import mongoose from "mongoose"; // Import Mongoose for database modeling

// Define a schema for income transactions
const IncomeSchema = new mongoose.Schema(
  {
    title: {
      type: String, // The title of the income entry (e.g., "Salary", "Freelance Work")
      required: true, // This field is mandatory
      trim: true, // Removes extra spaces from the beginning and end
      maxLength: 50, // Restricts the title to a maximum of 50 characters
    },
    amount: {
      type: Number, // Stores the amount of money (should be a number, not a string)
      required: true, // This field is mandatory
      trim: true, // Although `trim` is mainly for strings, it doesn't cause issues here
    },
    type: {
      type: String, // Specifies the type of transaction
      default: "income", // Default value is "income" (could be extended for expenses later)
    },
    date: {
      type: Date, // Stores the date of the transaction (should be a valid date)
      required: true, // This field is mandatory
    },
    category: {
      type: String, // Category of income (e.g., "Salary", "Investment", "Bonus")
      required: true, // This field is mandatory
      trim: true, // Removes extra spaces
    },
    description: {
      type: String, // Additional details about the income (optional but required)
      required: true, // This field is mandatory
      trim: true, // Removes extra spaces
      maxLength: 100, // Limits description length to 100 characters to avoid excessive text
    },
  },
  { timestamps: true } // Automatically creates `createdAt` and `updatedAt` fields
);

// Export the schema as a model to use in the database
export default mongoose.model("Income", IncomeSchema);
