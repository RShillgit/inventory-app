const express = require("express");
const router = express.Router();

const category_controller = require('../controllers/categoryController');

// CATEGORY ROUTES //

/* GET category page */
router.get('/', category_controller.index);

/* GET request for creating a category */
router.get('/create', function(req, res, next) {
    res.render('categoryCreate', {
        title: 'Create Category'
    });
});

/* Post request for creating a category */
router.post('/create', category_controller.createPOST);

/* GET request for one category */
router.get('/:id', function(req, res, next) {
    res.send(`Category ${req.params.id}`);
});

/* GET request to delete a category */
router.get('/:id/delete', function(req, res, next) {
    res.send('Category Delete GET');
});

/* POST request to delete a category */
router.post('/:id/delete', function(req, res, next) {
    res.send('Category Delete POST');
});

/* Get request to update a category */
router.get('/:id/update', function(req, res, next) {
    res.send('Category Update GET');
});

/* POST request to update a category */
router.post('/:id/update', function(req, res, next) {
    res.send('Category Update POST');
});

module.exports = router;