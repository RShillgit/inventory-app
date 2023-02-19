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
                all_items: results.allItems,
                all_categories: results.allCategories,
            })
        }
    )
} 

// Creates Item
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
    body("category", "Category must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors. Render form again.
        if (!errors.isEmpty()) {
            res.render('itemCreate', {
                err: err,
            })
        }  

        // Check to see if category exists, if not create a new one
        category.findOne({ name: req.body.category }).exec((err, results) => {
            if (err) {
                return next(err);
            }

            // If it exists set the item category equal to the category id
            if (results) {
                console.log(results._id)
                
                const newItem = new item({
                    name: req.body.name,
                    description: req.body.description,
                    category: results._id,
                    price: req.body.price,
                    number_in_stock: req.body.number_in_stock,
                })
                newItem.save((err, results) => {
                    if (err) {
                        return next(err);
                    }
                    // Successful: redirect to items page.
                    res.redirect('/items');
                })
            }

            // If it doesnt render error message
            else {
                res.render('itemCreate', {
                    err: 'This category does not exist.  Use existing categories or create a new category.',
                })
            }
        })
    } 
]

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
                title: 'Update Item',
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

        // Create an item object with escaped/trimmed data and old id.
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
                        title: 'Update Item',
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
            res.redirect('/items');
        });
    }
]

// Displays delete item page 
exports.deleteGET = (req, res) => {

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
            res.render('itemDelete', {
                title: 'Delete Item',
                item: results.specificItem,
                itemCategory: itemsCategory,
            })
        }
    )
}

// Deletes an item 
exports.deletePOST = (req, res) => {

    // Get the item for deletion
    item.findById(req.params.id)
        .exec(function(err, results) {
            if(err) {
                return next(err)
            }

            // If item is found delete it
            item.deleteOne({_id: results._id})
            .exec(function(err, results) {
                if(err) {
                    return next(err)
                }
                // Go back to index page
                res.redirect('/items')
            })
        }) 
}

