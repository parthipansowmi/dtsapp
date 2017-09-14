//var react = require('react');

exports.addNewCustomer = function (req, res) {
    var data = req.body;
    console.log(data);
    console.log('Adding customer: ' + JSON.stringify(data));
    //var isEmail = findCustomer(req, res);
    //var isMobile = findCustomerWithPhone(req, res);
    var db = req.app.locals.db;
    db.collection('customer', function (err, collection) {
        collection.insert(data, { safe: true }, function (err, result) {
            if (err) {
                console.log("Error in opening collection")
                res.send('false');
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send('true');
            }
        });
    });
};



exports.deleteCustomer = function (req, res) {
    var email = req.query.email;
    console.log('Deleting customer: ' + email);
     var db = req.app.locals.db;
    db.collection('customer', function (err, collection) {
        collection.remove({"email": email}, { safe: true }, function (err, result) {
            if (err || result == 0) {
                res.send(false);
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(true);
            }
        });
    });
};


    exports.findCustomer = function (req, res) {
    var email = req.query.email;
    var status;
    console.log("email: "+email);
    
    var conn = req.app.locals.db;
    conn.collection('customer', function (err, collection) {
        collection.find( {"email": email}).toArray(function (err, items) {
        	if ( err || items.length < 1)
        	{
        		status = false;
        		res.send({"status": status});
        	}
            else
            {
            	status=true;
            	res.send(items);
            }
        });
    });

};

exports.findCustomerWithPhone = function (req, res) {
    var phone = req.query.phone;
    var status;
    console.log("phone: "+phone);
    var conn = req.app.locals.db;
    conn.collection('customer', function (err, collection) {
        collection.find( {"phone": phone}).toArray(function (err, items) {
            if ( err || items.length < 1)
            {
                status = false;
                res.send(status);
            }
            else
            {
                status=true;
                res.send(status);
            }
        });
    });
};