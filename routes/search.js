exports.providerTypeSearch = function (req, res) {
   // var city = req.query.city;
    var pincode = req.query.type
    //var type = req.query.type;
    
    var status;
    console.log("Pincode: "+pincode);
    //console.log("City"+city);
    var conn = req.app.locals.db;
    conn.collection('serviceProvider', function (err, collection) {
        collection.find( { "servicetype": pincode}).toArray(function (err, items) {
            if ( err || items.length < 1)
            {
                status = false;
                console.log(err);
                res.send({"error" : " Errror in retrieving Data"});
            }
            else
            {
                status=true;
                res.send(items);
            }
        });
    });
};


exports.providerZipCodeSearch = function (req, res) {
   // var city = req.query.city;
    var pincode = req.query.pincode
    //var type = req.query.type;
    
    var status;
    console.log("Pincode: "+pincode);
    //console.log("City"+city);
    var conn = req.app.locals.db;
    conn.collection('serviceProvider', function (err, collection) {
        collection.find( { "zipcode": pincode}).toArray(function (err, items) {
        	if ( err || items.length < 1)
        	{
        		status = false;
                console.log(err);
        		res.send(items);
        	}
            else
            {
            	status=true;
            	res.send(items);
            }
        });
    });
};

exports.providerCitySearch = function (req, res) {
   
    var city= req.query.city;
    //var type = req.query.type;
    
    var status;
    console.log("City"+city);
    var conn = req.app.locals.db;
    conn.collection('serviceProvider', function (err, collection) {
        collection.find( { "city": city}).toArray(function (err, items) {
            if ( err || items.length < 1)
            {
                status = false;
                console.log(err);
                res.send({"error" : " Errror in retrieving Data"});
            }
            else
            {
                status=true;
                res.send(items);
            }
        });
    });
};


exports.bookingSearch = function (req, res) {
    var city = req.query.city;
    var pincode = req.query.pincode
    var type = req.query. type;
    
    var status;
    console.log("Pincode: "+pincode);
    console.log("City"+city);
    var conn = req.app.locals.db;
    conn.collection('booking', function (err, collection) {
        collection.find( {"city": city, "zipcode": pincode}).toArray(function (err, items) {
            if ( err || items.length < 1)
            {
                status = false;
                console.log(err);
                res.send({"error" : " Errror in retrieving Data"});
            }
            else
            {
                status=true;
                res.send(items);
            }
        });
    });
};