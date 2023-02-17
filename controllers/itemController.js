const { body, validationResult } = require("express-validator");

const item = require('../models/item');
const category = require('../models/category');

const async = require("async");

// Display index page of all items
exports.index = (req, res) => {
    res.render('itemsIndex', {
        title: 'Items Index Page',
        message: 'This is where all the items will be displayed',
    });
}
