var express = require('express');
// const db = require('../config/database');
var router = express.Router();
var isLoggedIn = require('../middleware/routeProtectors').isLoggedIn;
const {getRecentPosts, getPostById, getRandomPost, getCommentsByPostId} = require('../middleware/postmiddleware');
var db = require('../config/database');
const PostModel = require('../models/Posts');

/* GET home page. */
router.get('/', getRecentPosts, function (req, res, next) {
  res.render('homepage', { title: 'CSC 317 App', name: "Kalei A Woods" });
});

//localhost:3000/posts/search?search=value
router.get('/search', async (req, res, next) => {
  try {
    let searchTerm = req.query.search;
    if (!searchTerm) {
      res.send({
        message: "No search term given.",
        results: [],
      });
    } else {
      let results = await PostModel.search(searchTerm);
      if (results && results.length) {
        res.send({
          message: `${results.length} results found`,
          results: results
        });
      } else {
        let results = await PostModel.getNRecentPosts(8);
        res.send({
          message: "No results were found, but here are the 8 most recent posts.",
          results: results,
        });
      }
    }
  } catch (err) {
    next(err);
  }
});

router.get('/userRegistration', (req, res, next) => {
  res.render('userRegistration');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/userPosts', (req, res, next) => {
  res.render('userPosts');
});

router.use('/imageSubmission', isLoggedIn);

router.get('/imageSubmission', (req, res, next) => {
  res.render('imageSubmission');
});

router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId, (req, res, next) => {
        res.render('userPosts', { title: `Post ${req.params.id}` });
});

//Calls on a random post to be displayed when user clicks on user posts button
router.get('/post/randomPost', getRandomPost, (req, res, next) => {
  res.render('userPosts', { title: `Post ${req.params.id}` });
});

module.exports = router;
