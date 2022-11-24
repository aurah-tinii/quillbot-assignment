import { Sequelize } from "sequelize";

const db = new Sequelize("sqlite:todos.db");

export default db;
