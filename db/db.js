const mysql = require("mysql2/promise");
const config = require("../config/config");

async function query(sql, params) {
  const connection = await mysql.createConnection("mysql2://cj3959iptt6ohvgu:x9rrld6uusayh4td@au77784bkjx6ipju.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ucwqfl6wrm6jmf98");
  const [results] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query,
};
