const { body, validationResult } = require("express-validator");

const category = require('../models/category');
const item = require('../models/item');

const async = require("async");

exports.index = (req, res) => {
    res.send('Category Page');
}
