import { Sequelize } from "sequelize";

const db= new Sequelize('usuarios' ,'root','123',{
    host:"localhost",
    dialect:"mariadb"
})

export default db

