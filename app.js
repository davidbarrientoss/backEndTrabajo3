const express = require("express");
const fs=require("fs");

const app = express();

let server = app.listen(8080, () => {
  console.log("listening");
});

app.get("/products", async (req,res)=>{
  let data =fs.promises.readFile("/products.json","utf-8");
  res.send(data)
})

app.get("/randomProduct", async (req,res)=>{
  const data=fs.promises.readFile("/products.json","utf-8");
  let randomNumber=Math.floor(Math.random()*3)+1
  let result = data.filter(r => r.id===randomNumber);
  res.send(result)
})