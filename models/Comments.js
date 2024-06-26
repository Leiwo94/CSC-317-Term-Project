var db = require('../config/database');
const CommentModel = {};

CommentModel.create = (comment, postId, userId) => {
    let baseSQL = `INSERT INTO comments (comment, fk_postid, fk_authorid, created) VALUES (?,?,?, now());`
    console.log(`userid: ${userId}`)
    return db.execute(baseSQL, [comment, postId, userId])
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                return Promise.resolve(results.insertId);
            } else {
                return Promise.resolve(-1);
            }
        })
        .catch((err) => Promise.reject(err));
}

CommentModel.getCommentsForPost = (postId) => {
    let baseSQL = `SELECT u.username, c.comment, c.created, c.id
    FROM comments c
    JOIN users u
    on u.id=c.fk_authorid
    WHERE c.fk_postid=?
    ORDER BY c.created DESC`;

    console.log(postId);

    return db.query(baseSQL, [postId])
    .then(([results, fields]) => {
        return Promise.resolve(results);
    })
    .catch(err => Promise.reject(err));
}

module.exports = CommentModel;