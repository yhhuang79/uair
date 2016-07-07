var express = require('express');
var router = express.Router();

router.ws('/test',  function (req,  res,  next) {
  ws.on('message', function(msg) {
    ws.send(msg)
  });
})

module.exports = router;
