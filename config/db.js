require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);
async function connectionToDb() {
  try {
    await sequelize.authenticate();
    console.log("Connection to DB successful");
  } catch (err) {
    console.log(err);
  }
}
module.exports = { connectionToDb, sequelize };