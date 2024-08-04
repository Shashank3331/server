const express = require("express");
require("./config/dbConn");
const Product = require("./config/User");
const port = 2001;
const User = require('./config/UserSAuth');
const app = express();
const cors = require('cors')
// const Jwt = require('jsonwebtoken');
// const jwtKey = "jims";

app.use(express.json());
app.use(cors());

app.post("/sendData", async (req, res) => {
  const user = new Product(req.body);
  let result = await user.save();
  result = result.toObject();
  res.send(result);
});


app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});


  app.post('/login',async (req,res)=>{
    if(req.body.password && req.body.email){
     const user = await User.findOne(req.body).select('-password')
     if(user){
         res.send("Login success full");
        
     }
     else{
         res.send({result: "User not Found"})
     }
    }
    else{
     res.send({result: "User not Found"})
    }
 })

app.get("/getData", async (req, res) => {
  const user = await Product.find();
  if (user.length > 0) {
    res.send(user);
  } else {
    res.send({ Error: "No Data Found" });
  }
});

app.get("/search/:key", async(req,res)=>{
  let result = await Product.find({
    "$or":[
      {course: {$regex: req.params.key}}
    ]
  })
  res.send(result)
})

app.get('/product/:id',async(req,res)=>{
  let result = await Product.findOne({_id: req.params.id});
  if(result){
    res.send(result)
  }
  else{
    res.send({ result: "No record find"})
  }
})

app.put("/update/:id", async (req, res) => {
  let user = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(user);
});

app.delete("/remove/:id", async (req, res) => {
     const user = await Product.deleteOne(req.body);
     res.send(user)
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
