const { body, validationResult } = require("express-validator");

const item = require('../models/item');
const category = require('../models/category');

const async = require("async");

// Display index page
exports.index = (req, res) => {
    res.render('index', {
        title: 'Index Page',
    });
}

// Display list of all items
exports.items_list = (req, res) => {
    res.send('Items List Page');
}