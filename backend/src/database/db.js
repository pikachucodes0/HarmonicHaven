import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

export const Connection = async () => {
  try {
    console.log("Attempting to connect to the database...");
    await sequelize.authenticate();
    console.log("Database connected successfully!");
    await sequelize.sync(); // This will create the tables if they do not exist
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default sequelize;