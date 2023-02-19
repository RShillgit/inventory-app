const express = require("express");
const router = express.Router();

const item_controller = require('../controllers/itemController');

// ITEM ROUTES //

/* GET Index page */
router.get('/', item_controller.index);

/* GET request for creating an item */
router.get('/create', function(req, res, next) {
    res.render('itemCreate', {
        title: 'Create Item'
    });
});

/* Post request for creating an item */
router.post('/create', item_controller.createPOST);

/* GET request for one item */
router.get('/:id', function(req, res, next) {
    res.send(`Item ${req.params.id}`);
});

/* GET request to delete item */
router.get('/:id/delete', function(req, res, next) {
    res.send(`Item ${req.params.id} Delete GET`);
});

/* POST request to delete item */
router.post('/:id/delete', function(req, res, next) {
    res.send(`Item ${req.params.id} Delete POST`);
});

/* Get request to update item */
router.get('/:id/update', item_controller.updateGET);

/* POST request to update item */
router.post('/:id/update', item_controller.updatePOST);

module.exports = router;