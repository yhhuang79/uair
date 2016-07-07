var express = require('express');
var path    = require("path");

var router = express.Router();

router.get('/test',  function (req,  res,  next) {
  res.sendFile(path.join(__dirname+ '/../views/taiwanhot.html'));
})
module.exports = router;
