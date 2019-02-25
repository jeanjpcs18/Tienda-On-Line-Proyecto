module.exports = function (sequelize, Sequelize) {
    var Marca = sequelize.define('marca', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        codigo:{
            type: Sequelize.STRING(6)
        },
        nombreMarca: {
            type: Sequelize.STRING(255)
        },
        direccion:{
            type: Sequelize.STRING(250)
        }
    }, {freezeTableName: true, timestamps: false});
    Marca.associate = function (models) {
        models.marca.hasMany(models.producto, {
            foreignKey: 'id_marca'
        });
    }
    return Marca;
};