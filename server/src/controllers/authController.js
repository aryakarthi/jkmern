import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { validateLogin } from "../validators/userValidators.js";
import { generateRefreshAndAccessToken } from "../utils/generateToken.js";
import {
  getStoredRefreshToken,
  removeRefreshToken,
  storeRefreshToken,
} from "../services/tokens.js";
import {
  getRefreshTokenFromRedis,
  removeRefreshTokenFromRedis,
  storeRefreshTokenInRedis,
} from "../utils/redisActions.js";

const loginUser = asyncHandler(async (req, res) => {
  const { error, value } = validateLogin(req.body);

  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { email, password } = value;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    const { accessToken, refreshToken } = generateRefreshAndAccessToken(
      res,
      user._id
    );
    console.log({ accessToken, refreshToken });

    // await storeRefreshToken(user._id, refreshToken); // ? mongodb
    await storeRefreshTokenInRedis(user._id, refreshToken); // ? redis

    res.status(200).json({
      _id: user._id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const refresh = asyncHandler(async (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  // console.log(decoded);

  // const storedRefreshToken = await getStoredRefreshToken(decoded.id); // ? mongodb
  const storedRefreshToken = await getRefreshTokenFromRedis(decoded.id); // ? redis

  if (storedRefreshToken !== refreshToken) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  const accessToken = jwt.sign(
    { id: decoded.id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );

  res.cookie("access_token", accessToken, {
    httpOnly: !isProduction,
    secure: isProduction,
    sameSite: !isProduction ? "Strict" : "None",
    maxAge: process.env.ACCESS_TOKEN_MAX_AGE,
  });

  console.log("Request cookies:", req.cookies);
  console.log("Response cookies:", { access_token: res.get("Set-Cookie") });

  res.json({ message: "Token refreshed successfully" });
});

const logoutUser = asyncHandler(async (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  const refreshToken = req.cookies?.refresh_token;

  if (!refreshToken) {
    return res.sendStatus(204);
  }
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  // console.log(decoded);

  // await removeRefreshToken(decoded.id, refreshToken); // ? mongodb
  await removeRefreshTokenFromRedis(decoded.id); // ? redis

  res.clearCookie("refresh_token", {
    httpOnly: !isProduction,
    secure: isProduction,
    sameSite: !isProduction ? "Strict" : "None",
  });

  res.status(200).json({ message: "Logged out.!" });
});

export { loginUser, logoutUser, refresh };
