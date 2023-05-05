import { db } from "../db.js";
import jwt from "jsonwebtoken";
const secret = process.env.MY_SECRET;
export const getForms = (req, res) => {
  const q = "SELECT * FROM contact_us";
  db.query(q, (err, data) => {
    if (err) return res.send("this is an error");
    return res.status(200).json(data);
  });
};
export const getForm = (req, res) => {
  const q = "SELECT * FROM contact_us WHERE ID =?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send("this is an error");
    return res.status(200).json(data);
  });
};

export const addForm = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, secret, { ignoreExpiration: false }, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "INSERT INTO contact_us (`name`, `project_name`, `description`, `position`, `phone_number`, `email`) VALUES (?,?,?,?,?,?)";

    db.query(q, [req.body.company_name, req.body.logo_url], (err, data) => {
      if (err) return res.send(err);
      return res.status(200).json(data);
    });
  });
};

export const deleteForm = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, secret, { ignoreExpiration: false }, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "DELETE FROM contact_us WHERE ID =?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.send("this is an error");
      return res.status(200).json(data);
    });
  });
};
