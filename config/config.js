let config;
if (process.env.NODE_ENV=='production') {
  config = process.env.MYSQL_URL
} else {
  config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
  };
}
module.exports = config;
