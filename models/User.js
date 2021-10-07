// BRING IN SEQUELIZE MODELS, BCRYPT PACKAGE FOR USER AUTHENTICATION AND ACCESS TO DB CONNECTION
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// CREATE A POST MODEL
class User extends Model {
  // INSTANCE METHOD FOR CHECKING USER'S PASSWORD AGAINST HASHED DB PASSWORD
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// CREATE A POST MODEL
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      // BEFORE CREATING A NEW USER IN DB, HASH THEIR PASSWORD
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

// EXPORT THE POST MODEL FOR USE IN ROUTES
module.exports = User;