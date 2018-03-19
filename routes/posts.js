var express = require('express');
var router = express.Router();
var postsController = require('../controllers/posts.controller.js');

// We can also use the API in order to upload new content
router.get('/', postsController.gettingAllPosts);
// router.post('/', postsController.getAllUsersPref);


module.exports = router;
