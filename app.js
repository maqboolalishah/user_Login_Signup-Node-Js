const express = require('express');
const route =require('./router/index');
const bodyParser=require('body-parser');
const app =  express();
const port= '8000';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");

    next();
});
app.use('/api',route);
app.get("/home", (req, res) => {
    res.write("<h1>welcome</h1>");
    res.write("<h2>Main Page</h2>");
    res.end();
});

app.use((error, req, res, next) => {

    return res.status(error.code || 401).json({ error: error.message });
});
app.all("*", function(req, res) {
   return  res.status(404).json({ message: "Not Found" });
});

app.listen(8000,()=>{
    console.log(`listening on port ${port}`);
});