const { body, validationResult } = require("express-validator");

const category = require('../models/category');
const item = require('../models/item');

const async = require("async");

exports.index = (req, res) => {
    res.render('categoriesIndex', {
        title: 'Categories Index Page',
        message: 'This is where all the categories will be displayed',
    });
}
