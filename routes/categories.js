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
router.get('/:id', category_controller.individualGET);

/* GET request to delete a category */
router.get('/:id/delete', category_controller.deleteGET);

/* POST request to delete a category */
router.post('/:id/delete', category_controller.deletePOST);

/* Get request to update a category */
router.get('/:id/update', category_controller.updateGET);

/* POST request to update a category */
router.post('/:id/update', category_controller.updatePOST);

module.exports = router;