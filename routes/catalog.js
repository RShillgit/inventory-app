const express = require("express");
const router = express.Router();

const item_controller = require('../controllers/itemController');
const category_controller = require('../controllers/categoryController')

// ITEM ROUTES //

/* GET Index page */
router.get('/', item_controller.index);

/* GET Items page */ 
router.get('/items', item_controller.items_list);

/* GET request for creating an item */
router.get('/item/create', function(req, res, next) {
    res.send('Item Create GET');
});

/* Post request for creating an item */
router.post('/item/create', function(req, res, next) {
    res.send('Item Create POST');
});

/* GET request to delete item */
router.get('/item/:id/delete', function(req, res, next) {
    res.send('Item Delete GET');
});

/* POST request to delete item */
router.post('/item/:id/delete', function(req, res, next) {
    res.send('Item Delete POST');
});

/* Get request to update item */
router.get('/item/:id/update', function(req, res, next) {
    res.send('Item Update GET');
});

/* POST request to update item */
router.post('/item/:id/update', function(req, res, next) {
    res.send('Item Update POST');
});


// CATEGORY ROUTES //

/* GET category page */
router.get('/category', category_controller.index);

/* GET request for creating a category */
router.get('/category/create', function(req, res, next) {
    res.send('Category Create GET');
});

/* Post request for creating a category */
router.post('/category/create', function(req, res, next) {
    res.send('Category Create POST');
});

/* GET request to delete a category */
router.get('/category/:id/delete', function(req, res, next) {
    res.send('Category Delete GET');
});

/* POST request to delete a category */
router.post('/category/:id/delete', function(req, res, next) {
    res.send('Category Delete POST');
});

/* Get request to update a category */
router.get('/category/:id/update', function(req, res, next) {
    res.send('Category Update GET');
});

/* POST request to update a category */
router.post('/category/:id/update', function(req, res, next) {
    res.send('Category Update POST');
});

module.exports = router;