import RefreshToken from "../models/refreshTokenModel.js";

export const storeRefreshToken = async (userId, refreshToken) => {
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2mins
  await RefreshToken.findOneAndUpdate(
    { userId },
    { token: refreshToken, expiresAt },
    { upsert: true, new: true }
  );
};

export const getStoredRefreshToken = async (userId) => {
  const tokenRecord = await RefreshToken.findOne({ userId });
  if (!tokenRecord) throw new Error("Refresh token not found");
  return tokenRecord.token;
};

export const removeRefreshToken = async (userId, refreshToken) => {
  await RefreshToken.deleteOne({ userId, token: refreshToken });
};

