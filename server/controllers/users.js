const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require('dotenv').config()

async function signup(req, res) {
  const { email, password, name } = req.body;

  try {
    if (!email || !password) throw Error("äll fields must be filled");
    if (!validator.isEmail(email)) throw Error("email is not valid");
    if (!validator.isStrongPassword(password))
      throw Error("password is not strong enough");

    const exist = await User.findOne({ email });
    if (exist) throw Error("email already in use");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hash });

    res.status(201).json({ message: "üser created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) throw Error("äll fields must be filled");

  try {
    const user = await User.findOne({ email });
    if (!user) throw Error("incorrect email");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw Error("incorrect password");

    const token = await jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin, userName: user.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3h" }
    );

    res.status(200).json({ message: "üser logged in successfully", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getAllUsers(req, res) {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json({ message: "user fethced successfully", users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function editUserById(req, res) {
  const {id} = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate({_id:id},{...req.body},{new:true})
    res.status(200).json({ message: "üser edited successfully", updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function deleteUserById(req, res) {
  const {id} = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete({_id:id});
    if(!deletedUser) return res.status(404).json({message:"üseer not found"})
    res.status(200).json({ message: "user deleted successfully", deletedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { signup, login,getAllUsers,editUserById,deleteUserById };
