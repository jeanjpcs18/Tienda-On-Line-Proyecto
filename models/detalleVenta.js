module.exports = function (sequelize, Sequelize){
	var venta = require('./venta');
	var Venta = new venta(sequelize, Sequelize);


	var DetalleVenta = sequelize.define('detalleVenta', {
		id: { 
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER

		},
		cantidad: {
			type: Sequelize.DOUBLE
		},
		precioUnitario: {
			type: Sequelize.DOUBLE
		},
		precioTotal: {
			type: Sequelize.DOUBLE
		},
		external_id: {
			type: Sequelize.UUID
		}
	}, {

		freezeTableName: true, 
		timestamps: false

	});
	DetalleVenta.associate = function(models) {
		models.detalleVenta.hasMany(models.venta,{
			foreignKey: 'id_persona'
		});
	};

	DetalleVenta.belongsTo(Venta, {
		foreignKey: 'id_venta',
		constraints: false
	});

	return DetalleVenta;
};
