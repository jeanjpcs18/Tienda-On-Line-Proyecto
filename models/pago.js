module.exports =  function (sequelize, Sequelize){
	var venta = require('./venta');
	var Venta = new venta(sequelize, Sequelize);

	var Pago = sequelize.define('pago', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		metodoPago: {
			type: Sequelize.STRING(150)
		},
		external_id: {
			type: Sequelize.UUID
		}
	}, {

		freezeTableName: true,
		timestamps: false
		
	});
	Pago.belongsTo(Venta, {
		foreignKey: 'id_venta',
		constraints: false
	});
	Pago.associate = function (models){
		models.pago.hasOne(models.venta, {
			foreignKey: 'id_pago'
		});
	};

	return Pago; 
};
