const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//const formatPrice = (price,discount) => toThousand(Math.round(price*(1-(discount/100))));

let indexController = {

  raiz: (req, res) => {

    let productosRecomendados = products.filter(product => product.característica === 'Recomendado')

    res.render("index", { productosRecomendados });
  },

  dashboard: (req, res) => {


    res.render("dashboard");
  },



  search: (req, res) => {
    // Do the magic
    const results = [];
    products.forEach(product => {
     
      if (product.nombre.toLowerCase().includes(req.query.keywords.toLowerCase().trim())
       || product.variedad.toLowerCase().includes(req.query.keywords.toLowerCase().trim()) 
       || product.color.toLowerCase().includes(req.query.keywords.toLowerCase().trim())) {
        results.push(product);
      }
    });
    res.render("results", { results, search: req.query.keywords });
  }


}

module.exports = indexController;

