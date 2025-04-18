import db from "../utilities/database.js";

export const getCredentialFromDB = (email) => {
  return db.prepare("SELECT * FROM credentials WHERE email = ?").get(email);
};

export const getUserFromDB = (userId) => {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
};

export const insertUserToDB = (name) => {
  const { lastInsertRowid: userId } = db
    .prepare("INSERT INTO users (name) VALUES (?)")
    .run(name);

  return userId;
};

export const insertCredentialToDB = (userId, email, encryptedPassword) => {
  return db
    .prepare(
      "INSERT INTO credentials (userId, email, password) VALUES (?, ?, ?)"
    )
    .run(userId, email, encryptedPassword);
};

export const checkEmailExists = (email) => {
  return db.prepare("SELECT * FROM credentials WHERE email = ?").get(email);
};
