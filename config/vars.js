const path = require("path");
require("dotenv-safe").config({
  path: path.join(__dirname, "../.env"),
  sample: path.join(__dirname, "../.env.example"),
});
module.exports = {
  db: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: "localhost",
    dialect: "postgres",
  },
  secret: process.env.SECRET,
  email: process.env.EMAIL,
  email_password: process.env.EMAIL_PASSWORD,
  frontend_url: process.env.FRONTEND_URL,
  imageUrl: process.env.IMAGE_BACKEND,
};
