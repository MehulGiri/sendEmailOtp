var express = require('express');
var router = express.Router();

var connection = require('mysql');
const nodemailer = require("nodemailer");
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'at_cart_app'
  });
  connection.connect(function (err) {
    if (err) { console.log("Error While Mysql Coonect")}
    else { console.log("Connect this :")}
  });
module.exports = connection;

// Email Send 
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "mehul@gmail.com", // generated ethereal user
    pass: "mehul" // generated ethereal password
  }
});

var otpNumber;
var otpNumber = Math.floor(Math.random() * 99999 + 1);

router.post('/signup', function (req, res, next) {

  
  req.session.test_otp = otpNumber;
  var name=req.body.user_email;
  const mybodydata={
    email:req.body.user_email
  }
  console.log(name)

    connection.query('insert into demo set ?',mybodydata,async function(err,result){
      if(err){
        console.log(err.message);
      }else{
        let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: name, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Your OTP is  :" + otpNumber + "</b>"  // html body
              });
              console.log("Message sent: %s", info.messageId);
              console.log(otpNumber);
              
              res.redirect('/otp',)
      }
    }) 
})

router.post('/otp',function(req,res,next){

    var auth=req.body.user_otp;
    console.log(auth);
    console.log(otpNumber);

    if(auth == otpNumber){
        res.redirect('/login')
    }else{
      res.send('wrong otp')
    }
    
    

})


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.get('/otp', function (req, res, next) {
  res.render('otp', { title: 'Express' });
});
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
