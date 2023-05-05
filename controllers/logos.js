import { db } from "../db.js";
import jwt from "jsonwebtoken";
const secret = process.env.MY_SECRET;
export const getLogos = (req, res) => {
  const q = "SELECT * FROM our_clients";
  db.query(q, (err, data) => {
    if (err) return res.send("this is an error");
    return res.status(200).json(data);
  });
};
export const getLogo = (req, res) => {
  const q = "SELECT * FROM our_clients WHERE ID =?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send("this is an error");
    return res.status(200).json(data);
  });
};

export const addLogo = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, secret, { ignoreExpiration: false }, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "INSERT INTO our_clients (`company_name`, `logo_url`) VALUES (?,?)";

    db.query(q, [req.body.company_name, req.body.logo_url], (err, data) => {
      if (err) return res.send(err);
      return res.status(200).json(data);
    });
  });
};

export const deleteLogo = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, secret, { ignoreExpiration: false }, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "DELETE FROM our_clients WHERE ID =?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.send("this is an error");
      return res.status(200).json(data);
    });
  });
};
export const editLogo = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, secret, { ignoreExpiration: false }, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "UPDATE our_clients SET `company_name` = ?, `logo_url` = ? WHERE ID=?";

    db.query(
      q,
      [req.body.company_name, req.body.logo_url, req.params.id],
      (err, data) => {
        if (err) return res.send(err);
        return res.status(200).json(data);
      }
    );
  });
};
