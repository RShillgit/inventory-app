const { body, validationResult } = require("express-validator");

const item = require('../models/item');
const category = require('../models/category');

const async = require("async");

// Display index page of all items
exports.index = (req, res) => {

    // Get all items from the database
    item.find({})
    .exec(function (err, list_items) {
        if (err) {
            return next(err);
        }
        // Successful so send items to view
        res.render('itemsIndex', {
            title: 'Items Index Page',
            message: 'This is where all the items will be displayed',
            all_items: list_items,
        });
    })
} 
