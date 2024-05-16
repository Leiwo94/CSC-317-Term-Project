const express = require('express');
const router = express.Router();
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
const { create } = require('../models/Comments');


router.post('/create', (req, res, next) => {
    if (!req.session.username) {
        errorPrint("Sorry! You must be logged in to comment here!");
        res.json({
            code: -1,
            status: "danger",
            message: "Sorry! You must be logged in to comment here!"
        })
    } else {
        let { comment, postId } = req.body;
        let username = req.session.username;
        let userId = req.session.userId;
        // comment, postId, userId, created
        create(comment, postId, userId)
            .then((wasSuccessful) => {
                if (wasSuccessful != -1) {
                    successPrint(`Comment was created for ${username}`);
                    res.json({
                        code: 1,
                        status: "success",
                        message: "comment created",
                        comment: comment,
                        username: username
                    })
                } else {
                    errorPrint('comment was not saved');
                    res.json({
                        code: -1,
                        status: "danger",
                        message: "Comment was not created."
                    })
                }
            })
            .catch((err) => next(err));
    }


})


module.exports = router;