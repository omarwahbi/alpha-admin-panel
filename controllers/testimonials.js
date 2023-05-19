import { db } from "../db.js";
import jwt from "jsonwebtoken";
const secret = process.env.MY_SECRET;
export const getTestimonials = (req, res) => {
  const q = "SELECT * FROM testimonials";
  db.query(q, (err, data) => {
    if (err) return res.send("this is an error");
    return res.status(200).json(data);
  });
};
export const getTestimonial = (req, res) => {
  const q = "SELECT * FROM testimonials WHERE ID =?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send("this is an error");
    return res.status(200).json(data);
  });
};

export const addTestimonial = (req, res) => {
  const auth = req.cookies.access_token;
  const token = auth.split(" ")[1];
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, secret, (err, userInfo) => {
    if (err) return res.status(403).json(token);
    const q = "INSERT INTO testimonials (`company_name`, `text`) VALUES (?,?)";

    db.query(q, [req.body.company_name, req.body.text], (err, data) => {
      if (err) return res.send(err);
      return res.status(200).json(data);
    });
  });
};

export const deleteTestimonial = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, secret, { ignoreExpiration: false }, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "DELETE FROM testimonials WHERE ID =?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.send("this is an error");
      return res.status(200).json(data);
    });
  });
};
export const editTestimonial = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, secret, { ignoreExpiration: false }, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "UPDATE testimonials SET `company_name` = ?, `text` = ? WHERE ID=?";

    db.query(
      q,
      [req.body.company_name, req.body.text, req.params.id],
      (err, data) => {
        if (err) return res.send(err);
        return res.status(200).json(data);
      }
    );
  });
};
