/*jslint node: true */
'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendfile('./public/index.html')
});

module.exports = router;
