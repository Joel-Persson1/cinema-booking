import crypto from "crypto";

export const encrypt = (password) => {
  return crypto
    .createHmac("sha256", "MelkerÄlskarAttJongleraPåEnhjuling")
    .update(password)
    .digest("hex");
};
