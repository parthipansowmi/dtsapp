var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

const debug = require('debug')('dtsapp')  
const name = 'dtsapp'  
debug('booting %s', name) 
//var logger = require('winston').logger;
//var config = require( './config');

var routes = require('./routes/index');
var users = require('./routes/users');
var userProfile = require('./routes/userProfile');
var resetPasscode = require('./routes/resetPasscode');
var customer = require('./routes/customer');
var Provider = require('./routes/serviceprovider');
var Booking = require('./routes/booking');
var AstroBooking = require('./routes/astrologybooking');
var CateringBooking = require('./routes/cateringbooking');
var util = require('./routes/util');
var ProviderLogin = require('./routes/providerlogin')
var Search = require('./routes/search');
var Session = require('./routes/session');
var Customerfeedback = require('./routes/customerfeedback');
var subscription = require('./routes/subscription');
var Logindetails = require('./routes/logindetails');
var Customermessages = require('./routes/messages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/findemail', userProfile.findEmail);
app.get('/checklogin', userProfile.checkCredential);
app.post('/addcred', userProfile.adduserProfile);
app.put('/updatecred', userProfile.updatenewPassword);
app.delete('/removecred/:id', userProfile.deleteuserProfile);

app.get('/checkemail', ProviderLogin.findEmail);
app.get('/verifylogin', ProviderLogin.checkCredential);
app.put('/updatelogin', ProviderLogin.updatenewEmail);
app.post('/addlogin', ProviderLogin.addproviderlogin);
app.delete('/removelogin', ProviderLogin.deleteproviderlogin);

app.get('/getCode', resetPasscode.find);
app.post('/storePasscode', resetPasscode.storePasscode);
app.delete('/removeCode', resetPasscode.deletePasscode);

app.get('/findallsub', subscription.find);
app.post('/saveSubscription', subscription.saveSubscription);
app.delete('/removeSubscription', subscription.deleteSubscription);

app.get('/getCustomer', customer.findCustomer);
app.post('/addNewCustomer', customer.addNewCustomer);
app.delete('/removeCustomer', customer.deleteCustomer);
app.get('/getcustomerwithphone', customer.findCustomerWithPhone);

app.get('/getProvider', Provider.findserviceProvider);
app.post('/addNewProvider', Provider.addNewserviceProvider);
app.delete('/removeProvider', Provider.deleteserviceProvider);
app.get('/searchByType', Provider.searchByType);
app.put('/updateEmail', Provider.updateEmail);
app.put('/updatePhone', Provider.updatePhone);

app.get('/getBookingHistory', Booking.findBooking);
app.get('/getbookingrec', Booking.findBookingById);
app.get('/getbookingrecbyprovider',Booking.findBookingByProvider);
app.put('/updatebookinstatus', Booking.updateBookingStatus);
app.post('/newBooking', Booking.addNewBooking);
app.put('/changeDate', Booking.changeBookingDate);
app.delete('/removeBooking', Booking.deleteBooking);
app.put('/updateProviderLink', Booking.updateProviderLink);

app.get('/sendSMS', util.sendSMS);
app.get('/generatePass', util.passwordCode);
app.post('/sendmail', util.sendEmail);
app.post('/addOTP', util.addOTP);
app.get('/findOTP', util.findOTP);
app.delete('/deleteOTP', util.deleteOTP);

app.get('/searchBooking', Search.bookingSearch);
app.get('/searchbypincode', Search.providerZipCodeSearch);
app.get('/searchbycity', Search.providerCitySearch);

app.get('/genSessionid', Session.generateSessionId);
app.get('/getSessionid', Session.findSessionId);
app.post('/addSession', Session.addSession);
app.put('/deleteSession', Session.deleteSession);

app.get('/getAstroBookingHistory', AstroBooking.findAstrologybooking );
app.get('/getastrobookingrec', AstroBooking.findAstrologybookingById);
app.get('/getastrobookingrecbyprovider',AstroBooking.findAstrologybookingByProvider);
app.put('/updateastrobookinstatus', AstroBooking.updateAstrologybookingStatus);
app.post('/newastroBooking', AstroBooking.addNewAstrologybooking );
app.put('/astrobookingchangeDate', AstroBooking.changeAstrologybookingDate);
app.delete('/removeAstroBooking', AstroBooking.deleteAstrologybooking );
app.put('/updateAstroProviderLink', AstroBooking.updateProviderLink);

app.get('/getcateringbookingHistory', CateringBooking.findBooking);
app.get('/getcateringbookingrec', CateringBooking.findBookingById);
app.get('/getcateringbookingrecbyprovider',CateringBooking.findBookingByProvider);
app.put('/updatecateringbookinstatus', CateringBooking.updateBookingStatus);
app.post('/newcateringbooking', CateringBooking.addNewBooking);
app.put('/cateringchangeDate', CateringBooking.changeBookingDate);
app.delete('/removecateringbooking', CateringBooking.deleteBooking);
app.put('/updateCateringProviderLink', CateringBooking.updateProviderLink);


app.post('/storefeedback', Customerfeedback.storeFeedback);
app.get('/findfeedback', Customerfeedback.find);
app.put('/deletefeedback', Customerfeedback.deleteFeedback);

app.post('/storemessages', Customermessages.savemessages);
app.get('/findmessages', Customermessages.find);
app.delete('/deletemessages', Customermessages.deletemessages);

app.post('/storelogindetails', Logindetails.storeLogindetails);
app.get('/findlogindetails', Logindetails.findLoginDetails);
app.delete('/deletelogindetails', Logindetails.deleteLogindetails);
app.post('/updatelogouttime', Logindetails.updateLogoutTime);

 
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

MongoClient.connect('mongodb://localhost:27017/bmf', { promiseLibrary: Promise }, (err, db) => {
  if (err) {
    console.log(`Failed to connect to the database. ${err.stack}`);
  }
  app.locals.db = db;
  //console.log(app.locals.db);
  app.listen('3006', () => {
    console.log('Node.js app is listening at http://localhost:3006');
  });
});

/*app.listen(3000, function () {
  console.log('Application listening on port 3000!');
});*/

module.exports = app;