const express = require("express");
const router = express.Router();

const { MENU_LINKS } = require("../constants/navigation");
const STATUS_CODE = require("../constants/statusCode");
const {
  getProductsView,
  getAddProductView,
  addNewProduct,
  getNewProductView,
  getProductView,
  deleteProduct,
} = require("../controllers/productsController");

// Listeleme
router.get("/", (req, res) => {
  const products = require("../models/Product").getAll();
  res.render("products.ejs", {
    headTitle: "Shop - Products",
    path: "/",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products",
    products,
  });
});

// Ürün ekleme formu
router.get("/add", (req, res) => {
  res.render("add-product.ejs", {
    headTitle: "Shop - Add product",
    path: "/add",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/add",
  });
});

// Yeni ürün ekleme işlemi
router.post("/add", (req, res) => {
  const Product = require("../models/Product");
  const { name, description } = req.body;
  const newProduct = new Product(name, description);
  Product.add(newProduct);
  res.status(STATUS_CODE.FOUND).redirect("/products/new");
});

// Son eklenen ürünü göster
router.get("/new", (req, res) => {
  const newestProduct = require("../models/Product").getLast();
  res.render("new-product.ejs", {
    headTitle: "Shop - New product",
    path: "/new",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/new",
    newestProduct,
  });
});

// Belirli ürün detayını göster
router.get("/:name", (req, res) => {
  const product = require("../models/Product").findByName(req.params.name);
  if (!product) {
    return res.status(STATUS_CODE.NOT_FOUND).send("Product not found");
  }
  res.render("product.ejs", {
    headTitle: `Shop - ${product.name}`,
    path: "/product",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products",
    product,
  });
});

// Ürün silme işlemi
router.delete("/:name", (req, res) => {
  require("../models/Product").deleteByName(req.params.name);
  res.status(STATUS_CODE.OK).json({ success: true });
});

module.exports = router;
