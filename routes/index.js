var express = require('express');
var router = express.Router();
const customerController = require('../controllers/customer');
const internalUserController = require('../controllers/internalUser');
const itemController = require('../controllers/item');
const reservationController = require('../controllers/reservation');
const restaurantController = require('../controllers/restaurant');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET a list of all the customers */
router.get('/customers', customerController.index);

/* GET a customer given their id */
router.get('/customers/:id', customerController.show);

/* POST a customer */
router.post('/customers', customerController.create);

/* PUT a customer */
router.put('/customers/:id', customerController.update);

/* GET a list of all the internal users */
router.get('/internalUsers', internalUserController.index);

/* GET an internal user given their id */
router.get('/internalUsers/:id', internalUserController.show);

/* POST an internal user */
router.post('/internalUsers', internalUserController.create);

/* PUT an internal user */
router.put('/internalUsers/:id', internalUserController.update);

/* GET a list of all restaurant items */
router.get('/restaurants/:restaurantId/items', itemController.index);

/* GET a restaurant item given its id */
router.get('/restaurants/:restaurantId/items/:id', itemController.show);

/* POST a new restaurant item */
router.post('/restaurants/:restaurantId/items', itemController.create);

/* PUT an existing restaurant item */
router.put('/restaurants/:restaurantId/items/:id', itemController.update);

/* GET a list of all the reservations filtered by customer or restaurant */
router.get('/reservations', reservationController.index);

/* GET a reservation given its id */
router.get('/reservations/:id', reservationController.show);

/* POST a reservation */
router.post('/reservations', reservationController.create);

/* PUT a reservation */
router.put('/reservations/:id', reservationController.update);

/* GET a list of all the restaurants */
router.get('/restaurants', restaurantController.index);

/* GET a restaurant given its id */
router.get('/restaurants/:id', restaurantController.show);

/* POST a restaurant */
router.post('/restaurants', restaurantController.create);

/* PUT a restaurant */
router.put('/restaurants/:id', restaurantController.update);

module.exports = router;
