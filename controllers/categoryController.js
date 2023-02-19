const { body, validationResult } = require("express-validator");

const category = require('../models/category');
const item = require('../models/item');

const async = require("async");

exports.index = (req, res) => {

    // Get all categories from the database
    category.find({})
        .sort({_id: 1})
        .exec(function (err, list_categories) {
        if (err) {
          return next(err);
        }
        // Successful so send categories to view
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
                    // Successful: redirect to categories page.
                    res.redirect('/categories');
                })
            }
        })
    } 
]

// Display proper information in update form
exports.updateGET = (req, res) => {

    // Get selected category 
    category.findById(req.params.id)
        .exec(function (err, category) {
            if (err) {
              return next(err);
            }
            // Successful so send category info to view
            res.render('categoryUpdate', {
                title: 'Update Category',
                category: category,
            })
        })
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

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // There are errors. Render form again with sanitized values/error messages.
        if (!errors.isEmpty()) {
  
            // Get selected category from the database 
            category.findById(req.params.id)
            .exec(function (err, category) {
                if (err) {
                return next(err);
                }
                // Successful so send category info to view
                res.render('categoryUpdate', {
                    title: 'Update Category',
                    category: category,
                })
            })
        }

        const newCategory = new category({
            name: req.body.name,
            description: req.body.description,
            _id: req.params.id, //This is required, or a new ID will be assigned!
        });

        // Data from form is valid. Update the record.
        category.findByIdAndUpdate(req.params.id, newCategory, (err, results) => {
            if (err) {
                return next(err);
            }
            res.redirect('/categories');

        });
    }
]

// Displays delete item page 
exports.deleteGET = (req, res) => {

    // Get selected category and all items from the database
    async.parallel(
        {
            specificCategory(callback) {
                category.findById(req.params.id)
                    .exec(callback)
            },
            allItems(callback) {
                item.find({})
                .exec(callback)
            }
            
        },
        (err, results) => {
            if(err) {
                return next(err)
            }
            // Success
            const allAssociatedItems = results.allItems.filter((ite) => {
                return ite.category.toString() === results.specificCategory._id.toString();
            })
            res.render('categoryDelete', {
                title: 'Delete Category',
                category: results.specificCategory,
                allAssociatedItems: allAssociatedItems,
            })
        }
    )
}

// Deletes an item 
exports.deletePOST = (req, res) => {

    // Get selected category and all items from the database
    async.parallel(
        {
            specificCategory(callback) {
                category.findById(req.params.id)
                    .exec(callback)
            },
            allItems(callback) {
                item.find({})
                .exec(callback)
            }
            
        },
        (err, results) => {
            if(err) {
                return next(err)
            }

            // Check if there are any items in this category
            const allAssociatedItems = results.allItems.filter((ite) => {
                return ite.category.toString() === results.specificCategory._id.toString();
            })
            
            // If there are items in this category return an error message
            if(allAssociatedItems.length > 0) {

                // Get selected category and all items from the database
                async.parallel(
                    {
                        specificCategory(callback) {
                            category.findById(req.params.id)
                                .exec(callback)
                        },
                        allItems(callback) {
                            item.find({})
                            .exec(callback)
                        }
                        
                    },
                    (err, results) => {
                        if(err) {
                            return next(err)
                        }
                        // Get Associated Items
                        const allAssociatedItems = results.allItems.filter((ite) => {
                            return ite.category.toString() === results.specificCategory._id.toString();
                        })
                        res.render('categoryDelete', {
                            title: 'Delete Category',
                            category: results.specificCategory,
                            allAssociatedItems: allAssociatedItems,
                            err: 'There are items in this category.  In order to delete this category, the associated items must be deleted first.',
                        })
                    }
                )}

            // If there are no items in this category then delete it
            else {
                category.deleteOne({_id: results.specificCategory._id})
                .exec(function(err, results) {
                    if(err) {
                        return next(err)
                    }
                    // Go back to categories page
                    res.redirect('/categories')
                })
            }
        }
    )
}
