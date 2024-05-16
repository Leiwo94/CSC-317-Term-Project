const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
const sharp = require('sharp');
const multer = require('multer');
const crypto = require('crypto');
const PostError = require('../helpers/error/PostError');

var PostModel = require('../models/Posts');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/uploads");
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

const uploader = multer({ storage: storage });



router.post('/createPost', uploader.single("uploadImage"), (req, res, next) => {
    let photopath = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let thumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userId;

    sharp(photopath)
    .resize(200, 200)
    .toFile(thumbnail)
    .then(() =>{
        return PostModel.create(title,
            description,
            photopath,
            thumbnail,
            fk_userId,);
    })
    .then((postWasCreated) => {
        if(postWasCreated){
            req.flash('success', "Your post was created successfully!");
            res.redirect('/');
        }else{
            throw new PostError('Post could not be created!', 'imageSubmission', 200);
        }
    })
    .catch((err) =>{
        if(err instanceof PostError){
            errorPrint(err.getMessage());
            req.flash('error', err.getMessage());
            res.status(err.getStatus());
            res.redirect(err.getRedirectURL());
        }else{
            next(err);
        }
    })
});

module.exports = router;