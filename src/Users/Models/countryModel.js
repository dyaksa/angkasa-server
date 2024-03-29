const db = require("../../Config/db");
require("dotenv").config();

module.exports = {
  country: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO country ( name_country) VALUES ('${data.name_country}')`,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  getAllData: (name, sort, typesort, limit, offset) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT *, (SELECT COUNT(*) FROM country) as count FROM country WHERE name_country LIKE '%${name}%' ORDER BY ${sort} ${typesort} LIMIT ${limit} OFFSET ${offset} `;
      db.query(query, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM country`;
      db.query(query, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  getId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM country WHERE idcountry='${id}'`,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  update: (data, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE country SET ? WHERE idcountry = ?`,
        [data, id],
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM country WHERE idcountry='${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
};
