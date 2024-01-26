require("dotenv").config();
const nodemailer = require("nodemailer");
const express = require("express");
const { main } = require("./models/index");
const productRoute = require("./router/product");
const storeRoute = require("./router/store");
const purchaseRoute = require("./router/purchase");
const salesRoute = require("./router/sales");
const cors = require("cors");
const User = require("./models/users");
const Product = require("./models/product");


const app = express();
const PORT = process.env.PORT || 8080;
main();
app.use(cors({
  origin: ['https://react-inventory-management-895ee5cb278c.herokuapp.com', 'https://another-allowed-origin.com']
}));
app.use(express.json());

// Store API
app.use("/api/store", storeRoute);

// Products API
app.use("/api/product", productRoute);

// Purchase API
app.use("/api/purchase", purchaseRoute);

// Sales API
app.use("/api/sales", salesRoute);

// ------------- Signin --------------
let userAuthCheck;
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  // res.send("hi");
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log("USER: ", user);
    if (user) {
      res.send(user);
      userAuthCheck = user;
    } else {
      res.status(401).send("Invalid Credentials");
      userAuthCheck = null;
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//forget
app.post("/api/forget", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      // Assuming you have a 'password' field in your User model
      const password = user.password; // Fetch the password from the user object
      sendPasswordByEmail(req.body.email, password); // Send the password to the user's email
      res.send("Password sent to your email.");
    } else {
      res.status(401).send("Email not found!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

async function sendPasswordByEmail(email, password) {
  // Create a nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vanshjain@gmail.com", // Your email address
      pass: "qwerty123456", // Your email password
    },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Vansh" <vansh@example.com>', // Sender address
    to: email, // List of recipients
    subject: "Password Recovery", // Subject line
    text: `Your password is: ${password}`, // Plain text body
    // You can also provide an HTML body if you wish
    // html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.messageId);
}

// Getting User Details of login user
app.get("/api/login", (req, res) => {
  res.send(userAuthCheck);
});
// ------------------------------------

// Registration API
app.post("/api/register", (req, res) => {
  let registerUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
  });

  registerUser
    .save()
    .then((result) => {
      res.status(200).send(result);
      alert("Signup Successfull");
    })
    .catch((err) => console.log("Signup: ", err));
  console.log("request: ", req.body);
});


app.get("/testget", async (req,res)=>{
  const result = await Product.findOne({ _id: '6429979b2e5434138eda1564'})
  res.json(result)

})

// Here we are listening to the server
app.listen(PORT, () => {
  console.log("I am live again");
});
