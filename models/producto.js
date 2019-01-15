module.exports = function (sequelize, Sequelize) {
    var categoria = require('../models/categoria');
    var Categoria = new categoria(sequelize, Sequelize);
    
    var Producto = sequelize.define('producto', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING(255)
        },
        caracteristicas:{
            type: Sequelize.STRING(255)
        },
        existencia:{
            type: Sequelize.INTEGER
        },
        external_id: {
            type: Sequelize.UUID
        }
    }, {freezeTableName: true, timestamps: false});
    Producto.associate = function (models) {
        models.producto.hasMany(models.detalleVenta, {
            foreignKey: 'id_producto'
        });
    }

    Producto.belongsTo(Categoria, {
        foreignKey: 'id_persona',
        constraints: false
    });
        
    return Producto;
    
};


