var express = require('express');
var router = express.Router();
var db = require('../config/database');

var app = express();
var port = 3306;
var bcrypt = require('bcrypt');


const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError');
const { registerValidation, loginValidation } = require('../middleware/validation');
const UserModel = require('../models/Users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// app.listen(port, () => {
//   console.groupCollapsed('listening on http://localhost:${port}...');
// })

router.post('/register', registerValidation, (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;

  UserModel.usernameExists(username)
    .then((usernameDoesExist) => {
      if (usernameDoesExist) {
        throw new UserError(
          "Registration Failed: Username already exists.",
          "/userRegistration",
          200
        );
      } else {
        return UserModel.emailExists(email);
      }
    })
    .then((emailDoesExist) => {
      if (emailDoesExist) {
        throw new UserError(
          "Registration Failed: Email already exists.",
          "/userRegistration",
          200
        );
      } else {
        return UserModel.create(username, password, email);
      }
    })
    .then((createdUserId) => {
      if (createdUserId < 0) {
        throw new UserError(
          "Server Error, user could not be created.",
          "/userRegistration",
          500
        );
      } else {
        successPrint("User.js --> User was created!");
        req.session.save(err => {
          res.redirect('/login');
          req.flash('success', 'User account has been made!');
        })
      }
    })
    .catch((err) => {
      errorPrint("User could not be made", err);
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
        req.flash('error', err.getMessage());
      } else {
        next(err);
      }
    });
  // db.execute("SELECT * FROM users WHERE username=?", [username])
  //   .then(
  //     ([results, fields]) => {
  //       if (results && results.length == 0) {
  //         return db.execute("SELECT * FROM users WHERE email=?", [email]);
  //       } else {
  //         throw new UserError(
  //           "Registration Failed: Username already exists.",
  //           "/userRegistration",
  //           200
  //         );
  //       }

  //     })
  //   .then(([results, fields]) => {
  //     if (results && results.length == 0) {
  //       return bcrypt.hash(password, 15);
  //     } else {
  //       throw new UserError(
  //         "Registration Failed: Email already exists.",
  //         "/userRegistration",
  //         200
  //       );
  //     }
  //   })
  //   .then((hashedPassword) => {
  //     let baseSQL = "INSERT INTO users(username, email, password, created) VALUES (?,?,?,now());"
  //     return db.execute(baseSQL, [username, email, hashedPassword])
  //   })
  //   .then(([results, fields]) => {
  //     if (results && results.affectedRows) {
  //       successPrint("User.js --> User was created!");
  //       req.session.save( err => {
  //         res.redirect('/login');
  //         req.flash('success', 'User account has been made!');
  //       });
  //     } else {
  //       throw new UserError(
  //         "Server Error, user could not be created.",
  //         "/userRegistration",
  //         500
  //       );
  //     }
  //   })
  //   .catch((err) => {
  //     errorPrint("User could not be made", err);
  //     if (err instanceof UserError) {
  //       errorPrint(err.getMessage());
  //       res.status(err.getStatus());
  //       res.redirect(err.getRedirectURL());
  //       req.flash('error', err.getMessage());
  //     } else {
  //       next(err);
  //     }
  //   });
});

router.post('/login', loginValidation, (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  // let baseSQL = "SELECT id, username, password FROM users WHERE username=?";
  // let userId;
  // db.execute(baseSQL, [username])
  //   .then(([results, fields]) => {
  //     if (results && results.length == 1) {
  //       let hashedPassword = results[0].password;
  //       userId = results[0].id;
  //       return bcrypt.compare(password, hashedPassword);
  //     } else {
  //       throw new UserError("invalid username and/or password.", "/login", 200);
  //     }
  //   })
  UserModel.authenticate(username, password)
    .then((loggedUserId) => {
      if (loggedUserId > 0) {
        successPrint(`User ${username} is logged in`);
        req.session.username = username;
        req.session.userId = loggedUserId;
        res.locals.logged = true;
        req.session.save(err => {
          res.redirect('/');
        });
        req.flash('success', 'You have been successfully logged in!');
      } else {
        throw new UserError("Invalid username and/or password.", "/login", 200);
      }
    })
    .catch((err) => {
      errorPrint("user login failed");
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        res.status(err.getStatus());
        res.redirect('/login');
        req.flash('error', err.getMessage());
      } else {
        next(err);
      }
    })
})

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      errorPrint('session could not be destroyed.');
      next(err);
    } else {
      successPrint('Session was destroyed.');
      res.clearCookie('csid');
      res.json({ status: "OK", message: "user is logged out." });
    }
  })
});

module.exports = router;

