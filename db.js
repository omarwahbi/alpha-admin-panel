import mysql from "mysql";
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Omarwahbi97",
  database: "alpha-website",
});
db.end(function (err) {
  if (err) {
    console.log("Error ending connection:", err);
  } else {
    console.log("Connection ended successfully");
  }
});
