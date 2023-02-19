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
            all_categories: list_categories,
        })
    }) 
}

// Creates category
exports.createPOST = [

    // Validate and sanitize fields.
    body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
    body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors. Render form again.
        if (!errors.isEmpty()) {
            res.render('categoryCreate', {
                err: err,
            })
        }  

        // Check to see if category already exists, if not create a new one
        category.findOne({ name: req.body.name }).exec((err, results) => {
            if (err) {
                return next(err);
            }

            // If it exists render error message
            if (results) {
                res.render('categoryCreate', {
                    err: 'A category with this name already exists',
                })
            }

            // If it doesnt create it
            else {
                
                const newCategory = new category({
                    name: req.body.name,
                    description: req.body.description,
                })
                newCategory.save((err, results) => {
                    if (err) {
                        return next(err);
                    }
                    // Successful: redirect to items page.
                    res.redirect('/categories');
                })
            }
        })
    } 
]
