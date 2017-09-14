var request = require('request');

exports.sendSMS = function (req, res) {
    console.log(req.query);
    var authkey = req.query.authkey;
    var mobiles = req.query.mobiles;
    var message = req.query.message;
    var sender = req.query.sender;
    var route = req.query.route;
    var country = req.query.country;
    var url = encodeURI(`https://control.msg91.com/api/sendhttp.php?authkey=` + authkey + '&mobiles=' + mobiles+'&message='+message+'&sender='+sender+'&route='+route+'&country='+country);
    console.log(url);

    request(url, function (error, response, query) {
    if (!error && response.statusCode == 200) {
      console.log('sendSMS - Response from API' + query);
      res.send('true');
        
    }
    else {
         console.log("sendSMS -API Server not running: "+error);
         res.send('false');
    }
  });
}

exports.sendEmail = function sendEmail(req, res) {
  var nodemailer = require('nodemailer');
  //var data = JSON.stringify(req.body);
  
  var data = JSON.stringify(req.body);
  console.log("Data: "+data);
  maildata = JSON.parse(data);
  var message =  maildata.message;
  console.log("Message: "+ message);
  var tomail = maildata.tomail;
  console.log("tomail: "+ tomail);
  var subject = maildata.subject;
  console.log("Subject: "+subject);
  var transporter = nodemailer.createTransport('smtps://dreamtruesolution%40gmail.com:sowmi6050@smtp.gmail.com');
  
  // setup e-mail data with unicode symbols 
  var mailOptions = {
    from: 'dreamtruesolution@gmail.com', // sender address 
    to: tomail, // list of receivers 
    subject: subject, // Subject line 
    
    html: message// html body 
  };

  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error Message' " + error);
      status = false;
      res.send('false');
    }
    else {
      status = true;
      console.log('Message sent: ' + info.response);
      res.send('true')
      
    }

  });
  
}

exports.passwordCode = function passwordCode(req, res) {
  console.log(req.query);
    var length= req.query.length;
  var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^*()-+<>ABCDEFGHIJKLMNOP1234567890";
  var pass = "";
  for (var x = 0; x < length; x++) {
    var i = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(i);
  }
  res.send(pass) ;
}

exports.addOTP = function (req, res) {
    var data = req.body;
    var db = req.app.locals.db;
    console.log('Adding OTP: ' + JSON.stringify(data));
    db.collection('otp', function (err, collection) {
        collection.insert(data, { safe: true }, function (err, result) {
            if (err) {
                res.send('false');
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send('true');
            }
        });
    });
};

exports.deleteOTP = function (req, res) {
    var otp= req.query.otp;
    var db = req.app.locals.db;
    console.log('Deleteing OTP: ' + JSON.stringify(otp));
    db.collection('otp', function (err, collection) {
        collection.remove({'otp': otp}, { safe: true }, function (err, result) {
            if (err) {
                res.send('false');
            } else {
                console.log('Success: ' + JSON.stringify(result));
                res.send('true');
            }
        });
    });
};

exports.findOTP = function (req, res) {
    var email = req.query.email;
    var otp = req.query.otp;
    var db = req.app.locals.db;
    console.log(' OTP: ' + otp);
    db.collection('otp', function (err, collection) {
        collection.find({ "email": email, "otp": otp}).toArray(function (err, items) {
            if (err) {
                res.send('false');
            } else {
                console.log('No. of records: ' + items.length);
                if ( items.length > 0)
                  res.send('true');
                else 
                  res.send('false');
            }
        });
    });
};
