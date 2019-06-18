var express = require('express');
var router = express.Router();
var usersController = require('../controlers/User');

router.get('/', usersController.getUsers);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);
router.get('/force', usersController.getForce);

module.exports = router;