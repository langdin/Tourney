let express = require('express');
let router = express.Router();

let passport = require('passport');

let indexController = require('../controllers/index');

/* POST - processes the Login Page */
router.post('/login', indexController.processLoginPage);

/* GET - get user data */
router.get('/user/:id', indexController.getUser);

/* POST - processes the Register Page */
router.post('/user/edit', indexController.editUser);

/* POST - processes the Register Page */
router.post('/register', indexController.processRegisterPage);

/* GET - perform user logout */
router.get('/logout', indexController.performLogout);

module.exports = router;
