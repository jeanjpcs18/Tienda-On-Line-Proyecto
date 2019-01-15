module.exports = function (sequelize, Sequelize) {
    var persona = require('../models/persona');
    var Persona = new persona(sequelize, Sequelize);
    var Venta = sequelize.define('venta', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        external_id: {
            type: Sequelize.UUID
        },
        fecha:{
            type: Sequelize.DATE
        },
        subtotal:{
            type: Sequelize.DOUBLE
        },
        iva:{
            type: Sequelize.DOUBLE
        },
        total:{
            type: Sequelize.DOUBLE
        },
        costoEnvio:{
            type: Sequelize.DOUBLE
        }
    }, {freezeTableName: true,
        createdAt: 'fecha_registro',
        updatedAt: 'fecha_modificacion'
        });
        
    Venta.belongsTo(Persona, {
        foreignKey: 'id_persona',
        constraints: false
    });
        
    return Venta;
};


