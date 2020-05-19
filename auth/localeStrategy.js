const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
}, function (login, password, cb) {
    if(login === 'admin' && password === 'test'){
        return cb(null, {
            login: 'admin',
            password: 'test'
        })
    }else{
        return cb(null, false)
    }
}))
