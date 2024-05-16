const checkUsername = (username) => {
    let usernameChecker = /^\D\w{2,}$/;
    return usernameChecker.test(username);
}
const checkPassword = (password) => {
    const passRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[(\/*-+!@#$^&*)]).{8,}$");

    let passwordChecker = passRegex;
    return passwordChecker.test(password);
}
const checkEmail = (email) => {
    const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

    let emailChecker = emailRegex;
    return emailChecker.test(email);

}

const registerValidation = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;


    if (!checkUsername(username)) {
        req.flash('error', "invalid username!");
        req.session.save(err => {
            res.redirect("/userRegistration");
        });
    } else if (!checkPassword(password)) {
        req.flash('error', "Invalid password!");
        req.session.save(err => {
            res.redirect("/userRegistration");
        });
    } else if (!checkEmail(email)) {
        req.flash('error', "Invalid email!");
        req.session.save(err => {
            res.redirect("/userRegistration");
        });
    } else {
        next();
    }
}

const loginValidation = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    if (!checkUsername(username)) {
        req.flash('error', "Invalid username! Please check your username and try again.");
        req.session.save(err => {
            res.redirect("/login");
        });
    } else if (!checkPassword(password)) {
        req.flash('error', "Invalid password!");
        req.session.save(err => {
            res.redirect("/login");
        });
    } else {
        next();
    }
}

module.exports = { registerValidation, loginValidation }