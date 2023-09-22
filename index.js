const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const medicineRoute = require("./routes/medicine");
const customerRoute = require("./routes/customer");
const storage = require('./middlewares/upload')
const multer = require("multer");
const cors = require('cors');
var cookieParser = require('cookie-parser');
const PORT = process.env.PORT_URL || 5000







// Secure URL
dotenv.config();
//
app.use(cors({
  "origin": "http://localhost:3000/",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
}))
// JSON Use
app.use(express.json());
app.use(cookieParser())

// Mongo DB Connection mongodb://localhost:27017
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection Success !");
  })
  .catch((error) => {
    console.log(error);
  });

////////////////////////////// Starts Routes////////////////////////////////////////////
// Routes  Upload 
// Increase the request size limit for express.json
const bodyParser = require('body-parser');
const upload = multer({ storage: storage , limits: { fileSize: 1024 * 1024 * 5 }});

// Configure body-parser to handle JSON data
app.use(bodyParser.json());

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Upload route for adding a medicine
app.post('/upload', upload.single('mimage'), (req, res , next) => {
  const imagePath = req.file ? req.file.path : '';
  res.status(200).json(imagePath);
  next();
});












// Routes Auth
app.use("/auth", authRoute);
// Routes Medicine
app.use("/medicine", medicineRoute );
// Routes Customer
app.use("/customer", customerRoute );

//////////////////////////////// End Routes/////////////////////////////////////////////
// Start Server
app.listen(PORT, () => {
  console.log("Server is running 5000 port");
});
