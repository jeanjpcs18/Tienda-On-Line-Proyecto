module.exports = function (sequelize, Sequelize) {
    var Categoria = sequelize.define('categoria', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        codigo:{
            type: Sequelize.STRING(6)
        },
        nombreCategoria: {
            type: Sequelize.STRING(250)
        },
        descripcion:{
            type: Sequelize.STRING(250)
        },
        external_id: {
            type: Sequelize.UUID
        }
    }, {freezeTableName: true, timestamps: false});
    Categoria.associate = function (models) {
        models.categoria.hasMany(models.producto, {
            foreignKey: 'id_categoria'
        });
    }
    return Categoria;
};