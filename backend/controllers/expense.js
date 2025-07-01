const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });
  try {
    //validations
    if (!title || !category || !description || !date || amount == null) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (amount <= 0 || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a postitive number" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
  console.log(expense);
};
exports.getExpense = async (req, res) => {
  try {
    const Expense = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(Expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Expense Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Error" });
    });
};
