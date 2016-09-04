'use strict';

const Barcode = require("./barcodeToZipcode");
const Zipcode = require("./zipcodeToBarcode");
let barcode = new Barcode();
let zipcode = new Zipcode();
var express = require('express');


var app = express();
app.use(express.static("public"));
app.use(express.static("node_modules"));



app.get('/Zipcode', function (req, res) {
    res.send(zipcode.transformToBarCode(req.query.code));
});

app.get('/Barcode', function (req, res) {
    res.send(barcode.transformToZipCode(req.query.code));
});
var barcodeServer = app.listen(3002, function () {
   var host = barcodeServer.address().address;
   var port = barcodeServer.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});