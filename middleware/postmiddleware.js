// var db = require('../config/database');
const {getNRecentPosts, getPostById, getRandomPost} = require('../models/Posts');
const postMiddleware = {};
const{getCommentsForPost} = require('../models/Comments');

postMiddleware.getRecentPosts = async function(req, res, next){
    try{
        let results = await getNRecentPosts(8);
        res.locals.results = results;
        if(results.length == 0){
            req.flash('error', 'There are no posts created yet.');
        }
        next();
    }catch(err) {
        next(err);
    }
}

postMiddleware.getPostById = async function(req, res, next) {
    try{
        let postId = req.params.id;
        let results = await getPostById(postId);
        if(results && results.length){
            res.locals.currentPost = results[0];
            next();
        }else{
            req.flash('error', 'This is not the post you are looking for.');
            res.redirect('/');
        }
    }catch (error) {
        next(err);
    }
}



postMiddleware.getRandomPost = async function(req, res, next) {
    try{
        // let postId = req.params.id
        let results = await getRandomPost();

        if(results && results.length){
            let post = results[0];
            res.render('userPosts', {currentPost: post});
            next();
        }else{
            req.flash('error', 'This is not the post you are looking for.');
            res.redirect('/');
        }
        
    }catch (error) {
       next(error);
    }
}

postMiddleware.getCommentsByPostId = async function(req, res, next) {
    let postId = req.params.id;
    try {
        let results = await getCommentsForPost(postId);
        res.locals.currentPost.comments = results;
        next();
    }catch (error) {
        next(error);
    }
}

module.exports = postMiddleware;


// let baseSQL = 'SELECT id, title, description, thumbnail, created FROM posts ORDER BY created DESC LIMIT 8';
// db.execute(baseSQL,[])
// .then(([results, fields]) => {
//     res.locals.results = results;
//     if(results && results.length == 0){
//         req.flash('error', 'There are no posts created yet.');
//     }
//     next();
// })
// .catch((err) => next(err));