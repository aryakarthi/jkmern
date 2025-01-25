import jwt from "jsonwebtoken";

export const generateRefreshAndAccessToken = (res, id) => {
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN, // ? expiresIn: "2m"
  });

  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN, // ? expiresIn: "15s"
  });

  const isProduction = process.env.NODE_ENV === "production";
  // console.log(`NODE_ENV : ${isProduction}`);
  const cookieOptions = {
    httpOnly: !isProduction, // ? prevent XSS attacks, cross site scripting attack
    secure: isProduction,
    sameSite: !isProduction ? "Strict" : "None", // ? prevents CSRF attack, cross-site request forgery attack
  };

  res.cookie("refresh_token", refreshToken, {
    ...cookieOptions,
    maxAge: Number(process.env.REFRESH_TOKEN_MAX_AGE), // maxAge: 2 * 60 * 1000
  });

  res.cookie("access_token", accessToken, {
    ...cookieOptions,
    maxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE), // maxAge: 15 * 1000
  });

  return { accessToken, refreshToken };
};
