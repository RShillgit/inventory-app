const { body, validationResult } = require("express-validator");

const category = require('../models/category');
const item = require('../models/item');

const async = require("async");

exports.index = (req, res) => {

    // Get all items from the database
    category.find({})
        .sort({_id: 1})
        .exec(function (err, list_categories) {
        if (err) {
          return next(err);
        }
        // Successful so send items to view
        res.render('categoriesIndex', {
            title: 'Categories Index Page',
            message: 'This is where all the categories will be displayed',
            all_categories: list_categories,
        })
    }) 
}
