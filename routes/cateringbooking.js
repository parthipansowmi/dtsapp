//var react = require('react');
var ObjectId = require('mongodb').ObjectID;


exports.addNewBooking = function (req, res) {
    var data = req.body;
    var db = req.app.locals.db;
    delete data.sessionid;
    console.log('Adding catering booking: ' + JSON.stringify(data));
    db.collection('cateringbooking', function (err, collection) {
        collection.insert(data, { safe: true }, function (err, result) {
            if (err) {
                console.log("Error"+err)
                res.send(false);
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(true);
            }
        });
    });
};


exports.deleteBooking = function (req, res) {
    var email = req.query.email;
    console.log('Deleting booking: ' + email);
     var db = req.app.locals.db;
    db.collection('cateringbooking', function (err, collection) {
        
            collection.remove({"email": email}, { safe: true }, function (err, result) {
            console.log("Error: "+err);
            console.log("Result: "+result);
            if (result == 0 || err ) {
                res.send(false);                             
               
            } else {
                console.log(result.length + ' document(s) deleted');
                res.send(true);    
            }
        });
           
    });

}

    exports.findBooking = function (req, res) {
    var email = req.query.email;
    var status;
    console.log("email: "+email);
    var conn = req.app.locals.db;
    //console.log(conn);
    conn.collection('cateringbooking', function (err, collection) {
        console.log("Error"+err);
        collection.find({"email": email, "status": "booked"}).toArray(function (err, items) {
            console.log("Booking Record: "+items.length);
        	if ( err || items.length == 0 )
        	{
        		status = false;
        		res.send(items);
        	}
            else
            {
            	console.log("Booking List"+items);
            	res.send(items);
            }
        });
    });
}

 exports.findBookingByProvider = function (req, res) {
    var email = req.query.email;
    var status;
    console.log("email: "+email);
    var conn = req.app.locals.db;
    //console.log(conn);
    conn.collection('cateringbooking', function (err, collection) {
        console.log("Error"+err);
        collection.find({"provideremail": email, "status": "booked"}).toArray(function (err, items) {
            console.log("Booking Record: "+items.length);
            if ( err || items.length == 0 )
            {
                status = false;
                res.send(items);
            }
            else
            {
                console.log("Booking List"+items);
                res.send(items);
            }
        });
    });
}


exports.findBookingById = function (req, res) {
    //var email = req.query.email;
    var bookingid = req.query.bookingid;
   // console.log("email: "+email);
    console.log("bookingid: "+bookingid);
    var conn = req.app.locals.db;
    //console.log(conn);
    conn.collection('cateringbooking', function (err, collection) {
        console.log("Error"+err);
        collection.find({"bookingid": bookingid }).toArray(function (err, items) {
            console.log("Booking Record: "+items.length);
            if ( err || items.length == 0 )
            {
                status = false;
                res.send(items);
            }
            else
            {
                console.log()
                res.send(items);
            }
        });
    });
}


exports.updateBookingStatus = function (req, res) {
    //var email = req.query.email;
    var id = req.query.id;
    var bookingstatus = req.query.status;
    var status;
    console.log("id: "+id);
    var conn = req.app.locals.db;
    var ObjectId = require('mongodb').ObjectID;
    //console.log(conn);
    conn.collection('cateringbooking', function (err, collection) {
        console.log("Error"+err);
        collection.findAndModify( {"bookingid" : id},  [['_id','asc']], {$set:  { "status" : bookingstatus }},  function (err, result) {
            console.log("Booking Record: "+result);
            console.log("Error: "+err)
            if ( err  )
            {
                status = false;
                res.send(status);
            }
            else
            {
                status = true;
                res.send(status);
            }
        });
    });
}

exports.changeBookingDate = function (req, res) {
    var date = req.query.date;
    var id = req.query.id;
    console.log("Id: "+id)
    var status;
    console.log("Date: "+date);
    var conn = req.app.locals.db;
    //console.log(conn);
   conn.collection('cateringbooking', function (err, collection) {
        console.log("Error"+err);
        collection.findAndModify( { "bookingid" : id}, [['_id','asc']], {$set:  { "functiondate" : date }},  function (err, result) {
            console.log("Booking Record: "+result);
            console.log("Error: "+err)
            if ( err  )
            {
                status = false;
                res.send(status);
            }
            else
            {
                status = true;
                res.send(status);
            }
        });
    });""
}

exports.updateProviderLink = function (req, res) {
    var custemail = req.query.email;
    var provideremail = req.query.provideremail;
    var bookingid = req.query.bookingid;
    var providerphone= req.query.phone;
    console.log("Customer E-mail: "+custemail);
    console.log("Provider E-mail:"+provideremail);
    console.log("Provider Phone: "+providerphone);
    var conn = req.app.locals.db;
    //var ObjectId = require('mongodb').ObjectID;
    //console.log(conn);
    conn.collection('cateringbooking', function (err, collection) {
        console.log("Error"+err);
        collection.findAndModify( { "bookingid" :  bookingid }, [['_id','asc']], {$set:  { "provideremail" : provideremail, "providerphone" : providerphone}}, {new: false, upsert: true},  function (err, result) {
            console.log("Booking Record: "+result);
            //console.log("Error: "+err)
            if ( err  )
            {
                status = false;
                res.send(status);
            }
            else
            {
                status = true;
                res.send(status);
            }
        });
    });
}
