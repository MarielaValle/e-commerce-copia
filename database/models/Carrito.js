module.exports = (sequelize, dataTypes) => {
   let alias = 'Carrito';

   let cols = {


      id: {

         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
         type: dataTypes.INTEGER

      },
      

      id_usuario: {
         type: dataTypes.INTEGER,


      },
      id_producto: {
         type: dataTypes.INTEGER

      },
      nombre_vino:{
         type:dataTypes.STRING(100)

       },
      
      precio_venta: {

         type: dataTypes.INTEGER
      },
      imagen:{

         type:dataTypes.STRING(100)
      }
     


   }
   let config = {
      tableName: "carritos",
      timestamps: false
   }
   const Carrito = sequelize.define(alias, cols, config);

   Carrito.associate = (models) => {
      Carrito.belongsTo(models.Producto, { foreignKey: 'id_producto', as: 'Producto' });
      Carrito.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'Usuario' });
   }

   return Carrito;

}