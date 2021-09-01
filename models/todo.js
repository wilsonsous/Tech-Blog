// const { DataTypes } = require("sequelize/types");
// const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo' , {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Todo
};