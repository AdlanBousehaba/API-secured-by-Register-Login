const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const User = require('../models/User');

router.post('/register', userCtrl.signup);

router.post('/login', userCtrl.login);

router.post('/users', auth, userCtrl.userList);

module.exports = router;