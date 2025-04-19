const Product = require('../models/Product');
const STATUS_CODE = require('../constants/statusCode');

const getProductsView = (req, res) => {
  const products = Product.getAll();
  res.render('products', { products });
};

const getAddProductView = (req, res) => {
  res.render('add-product');
};

const addNewProduct = (req, res) => {
  const { name, description } = req.body;
  const newProduct = new Product(name, description);
  Product.add(newProduct);
  res.redirect('/products/new');
};

const getNewProductView = (req, res) => {
  const lastProduct = Product.getLast();
  res.render('new-product', { product: lastProduct });
};

const getProductView = (req, res) => {
  const product = Product.findByName(req.params.name);
  if (!product) {
    return res.status(STATUS_CODE.NOT_FOUND).send('Product not found');
  }
  res.render('product', { product });
};

const deleteProduct = (req, res) => {
  Product.deleteByName(req.params.name);
  res.status(STATUS_CODE.OK).json({ success: true });
};

module.exports = {
  getProductsView,
  getAddProductView,
  addNewProduct,
  getNewProductView,
  getProductView,
  deleteProduct,
};
