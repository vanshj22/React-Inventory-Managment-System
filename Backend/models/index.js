const mongoose = require("mongoose");
const uri = "mongodb+srv://admin:RoXNgneedWZDrUOn@cluster0.ypwz577.mongodb.net/?retryWrites=true&w=majority";


function main() {
    mongoose.connect(uri).then(() => {
        console.log("Succesfull")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };