import {
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
  const encryptedPassword = encrypt(password);

  const credentials = getCredentialFromDB(email);
  if (!credentials) return res.status(400).send(`Wrong email or password`);

  const passwordsMatch = credentials.password === encryptedPassword;
  if (!passwordsMatch) return res.status(400).send(`Wrong email or password`);

  const user = getUserFromDB(credentials.userId);
  req.session.user = user;

  return res.json({ message: "Login successfull", user });
};

export const logout = (req, res) => {
  req.session.destroy(() => res.send("Logged out"));
};

export const signup = (req, res) => {
  const { password, email, name } = req.body;
  const encryptedPassword = encrypt(password);

  const userId = insertUserToDB(name);

  insertCredentialToDB(userId, email, encryptedPassword);

  res.send("Signup successful");
};
