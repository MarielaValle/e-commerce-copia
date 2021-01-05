var db = require('../database/models/index.js');
const { Sequelize } = require('../database/models/index.js');
const { userInfo } = require('os');



// Importamos SDK
const mercadopago = require("mercadopago");
// Configuramos SDK con nuestro access token
mercadopago.configure({
  access_token: 'TEST-6623451607855904-111502-83c610c2165674e9bba665cfb4aa6b0c-672708410'
});




let pasarelaPagoController = {


  raiz: (req, res, next) => {

    let carrito = req.body.userCart;
    let itemCantidad = req.body.itemCantidad;
    let cantidadProductos = req.body.cantidadProductos;
    let sumaTotal = req.body.total;


    let orden = carrito.join('-');
    let itemC = itemCantidad.join('-');


    db.Order.create({

      numeroOrden: orden,
      codigoC: itemC,
      id_usuario: user.id,
      cantidadProductos: cantidadProductos,
      total: sumaTotal,
      date: new Date()


    }).catch(error => console.log(error));



    db.Carrito.findAll({

      where: {
        id_usuario: user.id
      },



    }).then(function (elemento) {


      let compra = [];



      elemento.map(function (elem) {
        let item;
        item =
        {
          title: elem.nombre_vino,
          quantity: elem.cantidad,
          currency_id: 'ARS',
          unit_price: elem.precio_venta
        }
        compra.push(item)


      })


      /*  const pagar = async (req, res) => {*/
      let preference = {
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
      mercadopago.preferences.create(preference)
        .then(function (response) {

          console.log(response.body);

          res.redirect(response.body.init_point);
          // Este valor reemplazará el string "<%= global.id %>" en tu HTML
         // global.id = response.body.id;
         // res.send(preference)
        }).catch(function (error) {
          console.log(error);
        });







     })

  }

  /*  const preferenciaCreada = await mercadopago.preferences.create(preference);
          return res.redirect(preferenciaCreada.response.init_point);
        
          return res.json(mercadoPagoPreferency);

        }
       })
      
       */
      
  
}
module.exports = pasarelaPagoController;







