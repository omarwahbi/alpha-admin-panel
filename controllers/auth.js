import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.MY_SECRET;

// create a user manually
// export const oneTimeRegister = (req, res) => {
//   const username = "ahmadAli";
//   const password = "ahmadAli98";
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(password, salt);

//   const q =
//     "INSERT INTO users (username, password_hash, salt) VALUES (?, ?, ?)";

//   db.query(q, [username, hash, salt], (err, data) => {
//     if (err) return res.json(err);
//     return res.json("user just added");
//   });
// };

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) {
      return res.status(404).json("Stop messing around");
    } else {
      const q = "SELECT * FROM users WHERE username = ?";
      db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        let passCheck = bcrypt.compareSync(
          req.body.password,
          data[0].password_hash
        );
        if (passCheck) {
          const iat = Math.floor(Date.now() / 1000);
          const exp = iat + 3600; // seconds
          const token = jwt.sign({ id: data[0].ID, exp }, secret, {});
          const { password_hash, ...others } = data[0];
          res
            .cookie("access_token", token, {
              httpOnly: false,
              secure: true,
              sameSite: "none",
              domain: ".vercel.app",
            })
            .status(200)
            .json(others);
        } else {
          return res.status(400).json("Forgot the password or something?");
        }
      });
    }
  });
};
export const logout = (req, res) => {
  res
    .clearCookie("access_token", { sameSite: "none", secure: true })
    .status(200)
    .json("Logged out");
};
