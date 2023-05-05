import { db } from "../db.js";
import jwt from "jsonwebtoken";
const secret = process.env.MY_SECRET;

export const getProjects = (req, res) => {
  const q = "SELECT * FROM projects";
  db.query(q, (err, data) => {
    if (err) return res.status(404).send("this is an error getting projects");
    return res.status(200).json(data);
  });
};
export const getProject = (req, res) => {
  const q = "SELECT * FROM projects WHERE ID =?";
  const q2 = "SELECT * FROM project_images WHERE project_ID = ?";

  let projectData = null;
  let projectImagesData = null;

  // Fetch project data from the database
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(404).json("This is an error getting project");
    projectData = data;
    checkAndSendResponse(); // Check if both queries are complete and send response
  });

  // Fetch project images data from the database
  db.query(q2, [req.params.id], (err, data) => {
    if (err)
      return res.status(404).send("This is an error getting project images");
    projectImagesData = data;
    checkAndSendResponse(); // Check if both queries are complete and send response
  });

  // Helper function to check if both queries are complete and send response
  const checkAndSendResponse = () => {
    if (projectData !== null && projectImagesData !== null) {
      // Both queries are complete, send combined data as response
      const responseData = {
        projectData: projectData,
        projectImagesData: projectImagesData,
      };
      return res.status(200).json(responseData);
    }
  };
};

export const addProject = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, secret, { ignoreExpiration: false }, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Start a new database transaction
    db.beginTransaction((err) => {
      if (err) throw err;

      const q1 =
        "INSERT INTO projects (`project_name`, `project_cover_URL`, `project_category_ID`, `time`, `date`) VALUES (?,?,?,?,?)";
      const q2 =
        "INSERT INTO project_images (`project_ID`, `img_URL`) VALUES (?,?)";

      // Execute the first query to insert into projects table
      db.query(
        q1,
        [
          req.body.project_name,
          req.body.project_cover_URL,
          req.body.project_category_ID,
          req.body.time,
          req.body.date,
        ],
        (err, data) => {
          if (err) {
            db.rollback(() => {
              throw err;
            });
          }

          const projectId = data.insertId; // Get the ID of the inserted project

          const imgUrls = req.body.img_URL; // Array of img_URL values from front-end

          // Loop through the imgUrls array and execute the second query for each value
          for (let i = 0; i < imgUrls.length; i++) {
            db.query(q2, [projectId, imgUrls[i]], (err, data) => {
              if (err) {
                db.rollback(() => {
                  throw err;
                });
              }
              if (i === imgUrls.length - 1) {
                // If it's the last iteration, commit the transaction
                db.commit((err) => {
                  if (err) {
                    db.rollback(() => {
                      throw err;
                    });
                  }
                  return res.status(200).json(data);
                });
              }
            });
          }
        }
      );
    });
  });
};
export const deleteProject = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, secret, { ignoreExpiration: false }, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "DELETE FROM projects WHERE ID =?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(404).send("this is an error");
      return res.status(200).json(data);
    });
  });
};

export const editProject = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, secret, { ignoreExpiration: false }, (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    db.beginTransaction((err) => {
      if (err) {
        throw err;
      }

      const q1 =
        "UPDATE projects SET `project_name` = ?, `project_cover_URL` = ?, `project_category_ID` = ? WHERE ID = ?";
      const q2 =
        "INSERT INTO project_images (ID, project_ID, img_URL) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE img_URL = ?";

      // Execute the first query to insert into projects table
      db.query(
        q1,
        [
          req.body.project_name,
          req.body.project_cover_URL,
          req.body.project_category_ID,
          req.params.id,
        ],
        (err, data) => {
          if (err) {
            db.rollback(() => {
              throw err;
            });
          }
          const imgUrls = req.body.img_URL; // Array of img_URL values from front-end

          // Loop through the imgUrls array and execute the second query for each value
          if (!req.body.img_URL || req.body.img_URL.length === 0) {
            // Perform actions for when img_URL is empty
            return res.status(200).json(data);
          }
          for (let i = 0; i < imgUrls.length; i++) {
            db.query(
              q2,
              [
                imgUrls[i].ID,
                req.params.id,
                imgUrls[i].img_URL,
                imgUrls[i].img_URL,
              ],
              (err, data) => {
                if (err) {
                  db.rollback(() => {
                    throw err;
                  });
                }

                if (i === imgUrls.length - 1) {
                  // If it's the last iteration, commit the transaction
                  db.commit((err) => {
                    if (err) {
                      db.rollback(() => {
                        throw err;
                      });
                    }

                    return res.status(200).json(data);
                  });
                }
              }
            );
          }
        }
      );
    });
  });
};
