module.exports = function (sequelize, Sequelize) {
    var venta = require('../models/rol');
    var Venta = new venta(sequelize, Sequelize);

    var DireccionVenta = sequelize.define('direccionVenta', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        numero: {
            type: Sequelize.STRING(255)
        },
        callePrincipal: {
            type: Sequelize.STRING(255)
        },
        calleSecundaria: {
            type: Sequelize.STRING(255)
        },
        ciudad: {
            type: Sequelize.STRING(255)
        },
        provincia_region: {
            type: Sequelize.STRING(255)
        },
        codPostal: {
            type: Sequelize.STRING(255)
        },
        pais: {
            type: Sequelize.STRING(255)
        },
        external_id: {
            type: Sequelize.UUID
        }
    }, {freezeTableName: true, timestamps: false});
        DireccionVenta.belongsTo(Venta, {
            foreignKey: 'id_direccionVenta',
            constraints: false
        });
        return DireccionVenta;
    }