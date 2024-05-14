const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.post('/handleLogin', siteController.handleLogin);
router.post('/handleSignup', siteController.handleSignup);
router.post('/handleSignupSocial', siteController.handleSignupSocial);
router.get('/logout', siteController.logout);
router.get('/', siteController.index);

module.exports = router;
