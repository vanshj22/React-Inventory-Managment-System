const Product = require("../models/product");
const Purchase = require("../models/purchase");
const Sales = require("../models/sales");
const Store = require("../models/store");

// Add Store
const addStore = async (req, res) => {
    console.log(req.body)
  const addStore = await new Store({
    userID : req.body.userId,
    name: req.body.name,
    category: req.body.category,
    address: req.body.address,
    city: req.body.city,
  });

  addStore.save().then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

// Get All Stores
const getAllStores = async (req, res) => {
  const findAllStores = await Store.find({"userID": req.params.userID}).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllStores);
};

// Update Selected Store
const updateSelectedStore = async (req, res) => {
  try {
    const updatedResult = await Store.findByIdAndUpdate(
      { _id: req.body.storeID },
      {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
      },
      { new: true }
    );
    console.log(updatedResult);
    res.json(updatedResult);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
};

// Delete Selected Store
const deleteSelectedSore = async (req, res) => {
  const deleteStore = await Store.deleteOne(
    { _id: req.params.id }
  );
  const deleteProduct = await Product.deleteOne(
    { storeID: req.params.id }
  );
  const deletePurchaseProduct = await Purchase.deleteOne(
    { storeID: req.params.id }
  );
  const deleteSaleProduct = await Sales.deleteOne(
    { StoreID: req.params.id }
  );
  res.json({ deleteStore, deleteProduct,deleteSaleProduct,deletePurchaseProduct });
};

module.exports = { addStore, getAllStores, updateSelectedStore, deleteSelectedSore};
