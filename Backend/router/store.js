const express = require("express");
const app = express();
const store = require("../controller/store");

// Add Store 
app.post("/add", store.addStore);

// Get All Store
app.get("/get/:userID", store.getAllStores)

// Update Selected Store
app.post("/update", store.updateSelectedStore)

// Delete Selected Store 
app.get("/delete/:id", store.deleteSelectedSore);

module.exports = app;
