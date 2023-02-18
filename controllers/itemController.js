const { body, validationResult } = require("express-validator");

const item = require('../models/item');
const category = require('../models/category');

const async = require("async");

// Display index page of all items
exports.index = (req, res) => {

    // Get selected item and all categories from the database
    async.parallel(
        {
            allItems(callback) {
                item.find({})
                    .sort({_id: 1})
                    .exec(callback)
            },
            allCategories(callback) {
                category.find({})
                .exec(callback)
            }
        },
        (err, results) => {
            if(err) {
                return next(err)
            }
            res.render('itemsIndex', {
                title: 'Items Index Page',
                message: 'This is where all the items will be displayed',
                all_items: results.allItems,
                all_categories: results.allCategories,
            })
        }
    )
} 

// Display proper information in update form
exports.updateGET = (req, res) => {

    // Get selected item and all categories from the database
    async.parallel(
        {
            specificItem(callback) {
                item.findById(req.params.id)
                    .exec(callback)
            },
            allCategories(callback) {
                category.find({})
                .exec(callback)
            }
            
        },
        (err, results) => {
            if(err) {
                return next(err)
            }
            // Success
            const itemsCategory = results.allCategories.find((cat) => {
                return cat._id.toString() === results.specificItem.category.toString();
            })
            res.render('itemUpdate', {
                item: results.specificItem,
                itemCategory: itemsCategory,
            })
        }
    )
}

// Update items information
exports.updatePOST = [

    // Validate and sanitize fields.
    body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
    body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
    body("category", "Category must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped/trimmed data and old id.
        const newItem = new item({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            number_in_stock: req.body.number_in_stock,
            _id: req.params.id, //This is required, or a new ID will be assigned!
        });
        
        // There are errors. Render form again with sanitized values/error messages.
        if (!errors.isEmpty()) {
  
            // Get selected item and all categories from the database
            async.parallel(
                {
                    specificItem(callback) {
                        item.findById(req.params.id)
                            .exec(callback)
                    },
                    allCategories(callback) {
                        category.find({})
                        .exec(callback)
                    }
                    
                },
                (err, results) => {
                    if(err) {
                        return next(err)
                    }
                    const itemsCategory = results.allCategories.find((cat) => {
                        return cat._id.toString() === results.specificItem.category.toString();
                    })
                    res.render('itemUpdate', {
                        item: results.specificItem,
                        itemCategory: itemsCategory,
                    })
                }
            )
        }
        
        // Data from form is valid. Update the record.
        item.findByIdAndUpdate(req.params.id, newItem, (err, results) => {
            if (err) {
                return next(err);
            }
            
            // Get selected item and all categories from the database
            async.parallel(
                {
                    allItems(callback) {
                        item.find({})
                            .sort({_id: 1})
                            .exec(callback)
                    },
                    allCategories(callback) {
                        category.find({})
                        .exec(callback)
                    }
                },
                (err, results) => {
                    if(err) {
                        return next(err)
                    }
                    res.redirect('/items');
                    /*
                    res.render('itemsIndex', {
                        title: 'Items Index Page',
                        message: 'This is where all the items will be displayed',
                        all_items: results.allItems,
                        all_categories: results.allCategories,
                    })
                    */
                }
            )
        });
    }
]

