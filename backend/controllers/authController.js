const User = require("../models/User");
const jwt = require("jsonwebtoken");

//generate JWT token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//when user registers
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageURL } = req.body;

  //checking if there is any missing fiels left

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //checking if emaial already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    //creating the new user

    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

//when user logs in
exports.loginUser = async (req, res) => {};

//when user registers, and we get the info
exports.getUserInfo = async (req, res) => {};
