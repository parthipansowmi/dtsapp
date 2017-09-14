////var react = require('react');

exports.storeFeedback = function (req, res) {
    var data = req.body;
    var db = req.app.locals.db;
    

    console.log('Adding custOmerfEedback: ' + JSON.stringify(data));
    db.collection('customerfeedback', function (err, collection) {
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


exports.deleteFeedback = function (req, res) {
    var id = req.query.code;
    console.log('Deleting customerfeedback: ' + id);
    var db = req.app.locals.db;
    db.collection('customerfeedback', function (err, collection) {
        collection.remove({'code': id}, { safe: true }, function (err, result) {
            if (result == 0) {
                res.send(false);
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(true);
            }
        });
    });

};

    exports.find = function (req, res) {
    var email = req.query.userEmail;
    //var customerfeedback = req.query.code;
    var status = 'true';
    console.log("email: "+email);
    //console.log("customerfeedback"+customerfeedback);
    var conn = req.app.locals.db;
    conn.collection('customerfeedback', function (err, collection) {
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