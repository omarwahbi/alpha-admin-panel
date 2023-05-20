import { db } from "../db.js";
import jwt from "jsonwebtoken";
const secret = process.env.MY_SECRET;
export const getAboutUs = (req, res) => {
  const token = req.headers.authorization;
  const q = "SELECT * FROM about_us";
  db.query(q, (err, data) => {
    if (err) return res.status(404).json(err);
    return res.status(200).json(data);
  });
};

export const editAboutUs = (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, secret, { ignoreExpiration: false }, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "UPDATE about_us SET `company_description` = ?, `years_experince` = ?, `num_projects` = ?";
    db.query(
      q,
      [
        req.body.company_description,
        req.body.years_experince,
        req.body.num_projects,
      ],
      (err, data) => {
        if (err) return res.json(err);
        res.status(200).json(data);
      }
    );
  });
};
