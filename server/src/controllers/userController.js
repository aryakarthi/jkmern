import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { capitalize } from "../utils/helper.js";
import { validateRegister } from "../validators/userValidators.js";
import { generateRefreshAndAccessToken } from "../utils/generateToken.js";
// import { validateRegister } from "../validators/zodValidator.js";
// import { prioritizeErrors } from "../utils/prioritizeError.js";

const registerUser = asyncHandler(async (req, res) => {
  // const response = validateRegister(req.body);
  // const sortedErrors = prioritizeErrors(response?.errors);
  // console.log(sortedErrors);
  // if (response?.errors) {
  //   res.status(400);
  //   throw new Error(response?.errors[0].message);
  // }
  // let { fname, lname, email, password } = response.data;
  // res.send({ fname, lname, email, password });

  const { error, value } = validateRegister(req.body);
  // console.log(error, value);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  let { fname, lname, email, password } = value;

  fname = capitalize(fname);
  lname = capitalize(lname);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email is already registered.!");
  }

  const user = await User.create({
    fname,
    lname,
    email,
    password,
  });

  if (user) {
    // generateRefreshAndAccessToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      fname: user.fname,
      lname: user.lname,
    });
    // res.status(201).json({ message: "User registered successfully.!" });
  } else {
    res.status(400);
    throw new Error("Registration failed.!");
  }
});

const getUser = async () => {};
const getAllUsers = async () => {};
const editUser = async () => {};
const removeUser = async () => {};

export { registerUser, getUser, getAllUsers, editUser, removeUser };
