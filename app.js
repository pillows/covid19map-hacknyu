var express = require('express');
var app = express();

// fs module is file system module used to read data
var fs = require('fs');

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening on ${port}`));