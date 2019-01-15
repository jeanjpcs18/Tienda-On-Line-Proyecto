module.exports = function (sequelize, Sequelize) {
    var Marca = sequelize.define('marca', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING(255)
        }
    }, {freezeTableName: true, timestamps: false});
    Marca.associate = function (models) {
        models.marca.hasMany(models.producto, {
            foreignKey: 'id_marca'
        });
    }
    return Marca;
};