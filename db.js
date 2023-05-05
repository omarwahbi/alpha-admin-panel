import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
export const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect(function (err) {
  if (err) throw err;
  console.log("Succesfully connected to PlanetScale!");
});
