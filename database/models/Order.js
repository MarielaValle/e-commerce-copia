module.exports = (sequelize, dataTypes) => {
    let alias = 'Order';
 
    let cols = { 

      id: {

         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
         type: dataTypes.INTEGER

      },
 
       numeroOrden: {
          type: dataTypes.STRING,
 
 
       },
       codigoC: {
         type: dataTypes.STRING,


      },

       id_usuario:{
         type:dataTypes.INTEGER
       },

       cantidadProductos:{
          type:dataTypes.INTEGER
       },

       total:{
          type: dataTypes.INTEGER,
       },
      
       date:{

         type:dataTypes.DATE
       }
      
      
 
 
    }
    let config = {
       tableName: "orders",
       timestamps: false
    }
    const Order = sequelize.define(alias, cols, config);
 
    Order.associate = (models) => {
      Order.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'Usuario' }); 
     
      
   
   }
 
    return Order;
 
 }