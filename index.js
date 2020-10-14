const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) =>{  // To remove CROS (cross-resource-origin-platform) problem
    res.setHeader('Access-Control-Allow-Origin',"*"); // to allow all client we use *
    res.setHeader('Access-Control-Allow-Methods',"OPTIONS,GET,POST,PUT,PATCH,DELETE"); //these are the allowed methods
    res.setHeader('Access-Control-Allow-Headers', "*"); // allowed headers (Auth for extra data related to authoriaztiom)
    next();
})

mongoose.connect("mongodb+srv://test:aditi@cluster0.403sd.mongodb.net/projectDB?retryWrites=true&w=majority",{
  useNewUrlParser: true,
        useUnifiedTopology: true
},
function(){console.log("connected to db");}
);


app.use("/api/user", authRoute);



app.get("/", (req, res) => {
  res.send("WORKING");
});

app.listen(3000,function(req, res) {
  console.log("Server running at port 3000");
});
