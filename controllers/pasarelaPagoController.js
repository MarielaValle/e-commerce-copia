var db = require('../database/models/index.js');
const { Sequelize } = require('../database/models/index.js');
const { userInfo } = require('os');



// Importamos SDK
const mercadopago = require("mercadopago");
// Configuramos SDK con nuestro access token
mercadopago.configure({
  access_token:TEST-8864673059964335-122713-e1402151321120e647bfbc567e9a0a28-118667643
});




let pasarelaPagoController = {


  raiz: (req, res, next) => {

    let carrito = req.body.userCart;
    let itemCantidad = req.body.itemCantidad;
    let cantidadProductos=req.body.cantidadProductos;
    let sumaTotal=req.body.total; 
   

    let orden = carrito.join('-');
    let itemC = itemCantidad.join('-');
  

    db.Order.create({
        
      numeroOrden:orden,
      codigoC:itemC,
      id_usuario:user.id,
      cantidadProductos:cantidadProductos,
      total:sumaTotal,
      date: new Date()
      
  
    }).catch(error => console.log(error));



    db.Carrito.findAll({

      where: {
        id_usuario: user.id
        },
        
       
    
    }).then(function(elemento){


     let compra=[];
    
      
   
      elemento.map(function(elem){
        let item;
       item=
      {
        title: elem.nombre_vino,
        quantity: elem.cantidad,
        currency_id: 'ARS',
        unit_price: elem.precio_venta
      }
      compra.push(item)
    
 
      })

      preference = {
        items: compra,
        payment_methods: {
          excluded_payment_types: [
            {
              id: "ticket",
            },
            {
              id: "atm",
            },
          ],
        },
        external_reference: "123123",
        binary_mode: true,
        auto_return: "all",
        back_urls: {
          failure: "http://localhost:3000/pago_rechazado/",
          success: "http://localhost:3000/pago_exitoso/",
        },
        
        
      
      }
    res.send(preference)
   
    mercadopago.preferences.create(preference)
    
}).catch(error => console.log(error));





  }
}
module.exports = pasarelaPagoController;

/*var preference = {
  items: [
    {
      title: 'nombre_vino',
      quantity: elem.cantidad,
      currency_id: 'ARS',
      unit_price: elem.precio_venta
    }
  ]
};
res.send(preference)
mercadopago.preferences.create(preference)

})

     */

/* mercadopago.preferences.create(preference)
title: item.nombre_vino,
currency_id: "ARS",
unit_price: item.precio_venta,
quantity: item.cantidad,
user_id: item.id_usuario,
producto_id: item.id_producto,
*/

/*
db.Producto.findAll({

  where: {
    id: carrito.map(function(item){
    return item
    })
  
}
}).then(function(resultado){

  productoComprado=resultado
  res.send(productoComprado)
})

.catch(error => console.log(error));

*/