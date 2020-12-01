const express = require("express");

const app = express();
app.get("/api/users",(req, res)=>{
    res.json("hhhh")
})
app.listen(8081)