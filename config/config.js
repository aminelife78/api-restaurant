let config;
if (process.env.JAWSDB_URL) {
  config = { JAWSDB_URL:"mysql2://cj3959iptt6ohvgu:x9rrld6uusayh4td@au77784bkjx6ipju.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ucwqfl6wrm6jmf98" };
} else {
  config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
  };
}
module.exports = config;
