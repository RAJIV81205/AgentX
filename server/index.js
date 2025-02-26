import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
});

const User = model("User", userSchema);


app.post("/user/signup", async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password, mobile });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});




app.listen(PORT, () => {
  console.log("Server is running on Port:", PORT);
});
