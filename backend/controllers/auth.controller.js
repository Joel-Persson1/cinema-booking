import {
  checkEmailExists,
  getCredentialFromDB,
  getUserFromDB,
  insertCredentialToDB,
  insertUserToDB,
} from "../models/auth.models.js";
import { encrypt } from "../utilities/encrypt.js";

export const whoami = (req, res) => {
  if (!req.session.user) return res.status(401).send("Not logged in");
  res.json(req.session.user);
};

export const login = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const encryptedPassword = encrypt(password);

  const credentials = getCredentialFromDB(email);
  if (!credentials)
    return res.status(400).json({ error: `Wrong email or password` });

  const passwordsMatch = credentials.password === encryptedPassword;
  if (!passwordsMatch)
    return res.status(400).json({ error: `Wrong email or password` });

  const user = getUserFromDB(credentials.userId);
  req.session.user = user;

  return res.json({ message: "Login successfull", user });
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    return res.json({ message: "Logged out" });
  });
};

export const signup = (req, res) => {
  try {
    const { password, email, name } = req.body;

    if (!password | !email || !name) {
      return res.status(400).json({ error: "Please enter every field" });
    }

    const emailExists = checkEmailExists(email);
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const encryptedPassword = encrypt(password);

    const userId = insertUserToDB(name);

    insertCredentialToDB(userId, email, encryptedPassword);

    res.json({ message: "Signup successful" });
  } catch (error) {
    console.error("signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
