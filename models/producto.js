module.exports = function (sequelize, Sequelize) {
    var categoria = require('../models/categoria');
    var Categoria = new categoria(sequelize, Sequelize);
    
    var Producto = sequelize.define('producto', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        codigo:{
            type: Sequelize.STRING(6)
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
        precio:{
            type: Sequelize.FLOAT
        },
        modelo:{
            type: Sequelize.STRING(15)
        },
        imagen:{
            type: Sequelize.STRING
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
        foreignKey: 'id_producto',
        constraints: false
    });
        
    return Producto;
    
};


