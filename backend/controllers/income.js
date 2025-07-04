const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const income = IncomeSchema({
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
    await income.save();
    res.status(200).json({ message: "Income added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
  console.log(income)

}
exports.getIncomes= async (req,res)=>{
    try {
        const Incomes=await IncomeSchema.find().sort({createdAt:-1})
        res.status(200).json(Incomes)
    } catch (error) {
        res.status(500).json({message:'Server Error'})
        
    }
}

exports.deleteIncome= async (req,res)=>{
    const{id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
    .then((income)=>{
        res.status(200).json({message:'Income Deleted'})
    })
    .catch((error)=>{
        res.status(500).json({message:'Server Error'})
    })
}
