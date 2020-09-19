const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Mensaje extends Model {}
Mensaje.init({
    author: DataTypes.STRING,
    message: DataTypes.STRING,
    ts: DataTypes.BIGINT
}, { sequelize, modelName: 'Mensaje',timestamps:false });



Mensaje.sync()


module.exports = Mensaje;
