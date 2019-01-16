module.exports = function (sequelize, Sequelize) {
    var Categoria = sequelize.define('categoria', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombreCat: {
            type: Sequelize.STRING(250)
        }
    }, {freezeTableName: true, timestamps: false});
    Categoria.associate = function (models) {
        models.categoria.hasMany(models.producto, {
            foreignKey: 'id_categoria'
        });
    }
    return Categoria;
};