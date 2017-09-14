//var react = require('react');
var ObjectId = require('mongodb').ObjectID;


exports.addNewAstrologybooking = function (req, res) {
    var data = req.body;
    var db = req.app.locals.db;
    delete data.sessionid;
    console.log('Adding Astrologybooking: ' + JSON.stringify(data));
    db.collection('astrologybooking', function (err, collection) {
        collection.insert(data, { safe: true }, function (err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};


exports.deleteAstrologybooking = function (req, res) {
    var email = req.query.email;
    console.log('Deleting AstrologyAstrologybooking: ' + email);
     var db = req.app.locals.db;
    db.collection('astrologybooking', function (err, collection) {
        
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

    exports.findAstrologybooking = function (req, res) {
    var email = req.query.email;
    var status;
    console.log("email: "+email);
    var conn = req.app.locals.db;
    //console.log(conn);
    conn.collection('astrologybooking', function (err, collection) {
        console.log("Error"+err);
        collection.find({"email": email, "status": "booked"}).toArray(function (err, items) {
            console.log("Astrologybooking Record: "+items.length);
        	if ( err || items.length == 0 )
        	{
        		status = false;
        		res.send(items);
        	}
            else
            {
            	console.log("AstrologyAstrologybooking List"+items);
            	res.send(items);
            }
        });
    });
}

 exports.findAstrologybookingByProvider = function (req, res) {
    var email = req.query.email;
    var status;
    console.log("email: "+email);
    var conn = req.app.locals.db;
    //console.log(conn);
    conn.collection('astrologybooking', function (err, collection) {
        console.log("Error"+err);
        collection.find({"provideremail": email, "status": "booked"}).toArray(function (err, items) {
            console.log("Astrologybooking Record: "+items.length);
            if ( err || items.length == 0 )
            {
                status = false;
                res.send(items);
            }
            else
            {
                console.log("Astrologybooking List"+items);
                res.send(items);
            }
        });
    });
}


exports.findAstrologybookingById = function (req, res) {
    //var email = req.query.email;
    var Astrologybookingid = req.query.Astrologybookingid;
   // console.log("email: "+email);
    console.log("Astrologybookingid: "+Astrologybookingid);
    var conn = req.app.locals.db;
    //console.log(conn);
    conn.collection('astrologybooking', function (err, collection) {
        console.log("Error"+err);
        collection.find({"Astrologybookingid": Astrologybookingid }).toArray(function (err, items) {
            console.log("Astrologybooking Record: "+items.length);
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


exports.updateAstrologybookingStatus = function (req, res) {
    //var email = req.query.email;
    var id = req.query.id;
    var Astrologybookingstatus = req.query.status;
    var status;
    console.log("id: "+id);
    var conn = req.app.locals.db;
    var ObjectId = require('mongodb').ObjectID;
    //console.log(conn);
    conn.collection('astrologybooking', function (err, collection) {
        console.log("Error"+err);
        collection.findAndModify( {"Astrologybookingid" : id},  [['_id','asc']], {$set:  { "status" : Astrologybookingstatus }},  function (err, result) {
            console.log("Astrologybooking Record: "+result);
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

exports.changeAstrologybookingDate = function (req, res) {
    var date = req.query.date;
    var id = req.query.id;
    console.log("Id: "+id)
    var status;
    console.log("Date: "+date);
    var conn = req.app.locals.db;
    //console.log(conn);
   conn.collection('Astrologybooking', function (err, collection) {
        console.log("Error"+err);
        collection.findAndModify( { "astrologybooking" : id}, [['_id','asc']], {$set:  { "functiondate" : date }},  function (err, result) {
            console.log("Astrologybooking Record: "+result);
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
    var Astrologybookingid = req.query.bookingid;
    var providerphone= req.query.phone;
    console.log("Customer E-mail - Astro: "+custemail);
    console.log("Provider E-mail:"+provideremail);
    console.log("Provider Phone: "+providerphone);
    var conn = req.app.locals.db;
    //var ObjectId = require('mongodb').ObjectID;
    //console.log(conn);
    conn.collection('astrologybooking', function (err, collection) {
        console.log("Error"+err);
        collection.findAndModify( { "bookingid" :  Astrologybookingid }, [['_id','asc']], {$set:  { "provideremail" : provideremail, "providerphone" : providerphone}}, {new: false, upsert: true},  function (err, result) {
            console.log("Astrologybooking Record: "+result);
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
