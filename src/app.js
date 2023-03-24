const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const hbs = require('hbs');
const passport = require("passport");
const session = require("express-session");
const login = false;

require('./auth');                //OAuth conn
require("./db/conn");             //database conn

//function to check if user is logged in
function isLoggedIn(req, res, next) {
    login = true;
    req.user ? next() : res.sendStatus(401);
}

// if(user.session.isLoggedIn){
//     login = true;
// } else {
//     login =  false;
// }

app.use(session({ 
    secret: 'lmao',
    resave: true,
    saveUninitialized: false  
}));
app.use(passport.initialize());
app.use(passport.session()); 

//public static path
const static_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);

//routing
app.get("/", (req, res)=> {
    res.render('index');
});

app.use('/', express.static(static_path));

app.get('/auth/google', 
    passport.authenticate('google', { scope: ['email', 'profile']})
);

app.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/successLogin',
        failureRedirect: '/try_again',
        
    })
);

app.get("/successLogin", (req, res)=> {
   // res.alert('Hello!'+user.getBasicProfile().getName());
    res.render('index',{
        Login: {login}
    });
    
});

app.get("/try_again", (req, res)=> {
    res.send('Sign In/Log In failed. Try again!');
});

app.get("/login", (req, res)=> {
    res.render('login');
});

app.get("/logout", (req, res) => {
    //req.logOut();
    req.logout(function(err) {
        if (err) { return next(err); }
    req.session.destroy();
    login=false;
    res.send("You're Logged out" ); })     //temporary
    //res.render('logout');            //permanent       
});

app.get("/clubpage-1", (req, res)=> {
    res.render('clubpage-1',{
        Login : {login}
    });
});
app.get("/clubpage-2", (req, res)=> {
    res.render('clubpage-2',{
        Login : {login}
    });
});
app.get("/clubpage-3", (req, res)=> {
    res.render('clubpage-3',{
        Login : {login}
    });
});
app.get("/clubpage-4", (req, res)=> {
    res.render('clubpage-4',{
        Login : {login}
    });
});

app.get("/*", (req, res)=> {
    res.render('404error');
});

app.listen(port, ()=> {
    console.log("server is running")});