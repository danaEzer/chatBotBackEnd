var postsModel = require('../models/post.model.js');
var autherModel = require('../models/auther.model.js');
// In the future the posts should be saved in the DB
var posts = [];

// Get posts
exports.getAllPosts = function(res) {
    res(posts);
}

// Add new post
exports.addNewPost = function(postObj, res) {
   var post = new postsModel.Post(postObj);
   var comment;
   verifyIfQuestionExist(post, function(existingComment){
        if(existingComment){
            // Question was asked before and has a comment
            var auther = new autherModel.Auther('Bot');
            generateId(function(randomNum) {
                var comment = new postsModel.Post(
                    'Mmmm... it sounds familier...', 
                    auther, 
                    Date.now(), 
                    'I have seen this question before. Here is what I have found (post title) - ' + existingComment.title + 
                    '. You can read more about it in the original post, just search the title in the previous posts.', 
                    [],
                    randomNum);
                    
                post.comments.push(comment);
                addPostToPostsList(post);
                res();
            });
        } else {
            verifyForbiddenWords(postObj.content, function(isForbbiden){
                if(isForbbiden) {
                    // Question contains a forbidden word
                    var auther = new autherModel.Auther('Bot');
                    generateId(function(randomNum) {
                        var comment = new postsModel.Post(
                            'I hate smurfs!!!!', 
                            auther, 
                            Date.now(), 
                            'I sincerely ask you to not mention offensive words, and I heat smurfs.',
                            [],
                            randomNum);
                        post.comments.push(comment);
                        addPostToPostsList(post);
                        res();
                    });
                } else {
                    iLoveIt(post.content, function(isLove) {
                        if(isLove) {
                            // Question is about love
                            var auther = new autherModel.Auther('Bot');
                            generateId(function(randomNum) {
                                var comment = new postsModel.Post(
                                    'Snorkmaiden', 
                                    auther, 
                                    Date.now(), 
                                    "I love Snorkmaiden, she's the prettiest Moomin I have ever met.",
                                    [],
                                    randomNum);
                                post.comments.push(comment);
                                addPostToPostsList(post);
                                res();
                            });
                        } else {
                            // Regular message
                            addPostToPostsList(post);
                            res();
                        }
                    })
                    
                }
            });
        }
   });
}



exports.updatePost = function(postId, comment, res){
    posts.forEach(post => {
        if(post.id === postId){
            post.comments.push(comment);
            res(post);
        }
    });
    // update all users
}

function generateId(res){
    var number = Math.random() // 0.9394456857981651
    number.toString(36); // '0.xtis06h6'
    var randomNum = number.toString(36).substr(2, 9); // 'xtis06h6'
    res(randomNum);
}

function verifyIfQuestionExist(post, res) {
    let check = false;
    for (let i = 0; i < posts.length; i++) {
        if(post.isEqual(posts[i])){
            check = true;
            res(posts[i].comments[0]);
            break;
        }
    }
    if(!check) {
        res(null);
    }
}

addPostToPostsList = function(post){
    posts.unshift(post);
}

verifyForbiddenWords = function(content, res) {
    res(content.includes("smurf"));
}

iLoveIt = function(content, res) {
    res(content.includes("love"));
}
