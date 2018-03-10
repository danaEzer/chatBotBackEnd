var dataService = require('../services/data.service.js');

exports.gettingAllPosts = function(req, res) {
    dataService.getAllPosts(function(posts){
        res.send(posts);
    });
};
