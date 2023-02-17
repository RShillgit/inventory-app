const express = require("express");
const router = express.Router();

const item_controller = require('../controllers/itemController');

// ITEM ROUTES //

/* GET Index page */
router.get('/', item_controller.index);

/* GET request for creating an item */
router.get('/create', function(req, res, next) {
    res.send('Item Create GET');
});

/* Post request for creating an item */
router.post('/create', function(req, res, next) {
    res.send('Item Create POST');
});

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
router.get('/:id/update', function(req, res, next) {
    res.send(`Item ${req.params.id} Update GET`);
});

/* POST request to update item */
router.post('/:id/update', function(req, res, next) {
    res.send(`Item ${req.params.id} Update POST`);
});

module.exports = router;