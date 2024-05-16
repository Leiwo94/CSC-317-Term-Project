const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');

const routeProtectors = {};

routeProtectors.isLoggedIn = function(req, res, next) {
    if(req.session.username){
        successPrint('User is logged in');
        next();
    }else{
        errorPrint('user is not logged in!');
        req.flash('error', 'Sorry friend, you must be logged in to access this page!');
        res.redirect('/login');
    }
}

module.exports = routeProtectors;