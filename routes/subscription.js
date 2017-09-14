////var react = require('react');

exports.saveSubscription = function (req, res) {
    var data = req.body;
    var db = req.app.locals.db;
    /*var date = new Date();
    date.setDate(date.getDate() + 1);
    data.expirydate=date;*/

    console.log('Adding subscription: ' + JSON.stringify(data));
    db.collection('subscription', function (err, collection) {
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


exports.deleteSubscription = function (req, res) {
    var id = req.query.email;
    console.log('Deleting subscription: ');
    var db = req.app.locals.db;
    db.collection('subscription', function (err, collection) {
        collection.remove({"email": email}, { safe: true }, function (err, result) {
            if ( err || result == 0) {
                console.log("Error in deleting document : "+ JSON.stringify(err));
                res.send(false);
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(true);
            }
        });
    });

};

    exports.find = function (req, res) {
    var email = req.query.email;
    var status = 'true';
    console.log("email: "+email);
    
    var conn = req.app.locals.db;
    conn.collection('subscription', function (err, collection) {
    collection.find( {"email": email}).toArray(function (err, items) {
             if ( err || items.length == 0)
        	{
        		status = 'false';
        		
        	}
           console.log("Status: "+status);
            res.send(items);
        });
    });
};