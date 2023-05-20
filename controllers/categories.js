import { db } from "../db.js";
import jwt from "jsonwebtoken";
const secret = process.env.MY_SECRET;
export const getCategories = (req, res) => {
  const q = "SELECT * FROM categories";
  db.query(q, (err, data) => {
    if (err) return res.send("this is an error");
    return res.status(200).json(data);
  });
};
export const getCategory = (req, res) => {
  const q = "SELECT * FROM categories WHERE ID =?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(400).json("this is an error");
    return res.status(200).json(data);
  });
};

export const addCategory = (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "INSERT INTO categories (category_name) VALUES (?)";
    db.query(q, [req.body.category_name], (err, data) => {
      if (err) return res.send(err);
      return res.status(200).json(data);
    });
  });
};

export const deleteCategory = (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "DELETE FROM categories WHERE ID =?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.send("this is an error");
      return res.status(200).json(data);
    });
  });
};
export const editCategory = (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "UPDATE categories SET `category_name` = ? WHERE ID=?";
    db.query(q, [req.body.category_name, req.params.id], (err, data) => {
      if (err) return res.send(err);
      return res.status(200).json(data);
    });
  });
};
