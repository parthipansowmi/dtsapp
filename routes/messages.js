////var react = require('react');

exports.savemessages = function (req, res) {
    var data = req.body;
    var db = req.app.locals.db;
   
    console.log('Adding messages: ' + JSON.stringify(data));
    db.collection('messages', function (err, collection) {
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


exports.deletemessages = function (req, res) {
    var id = req.query.email;
    console.log('Deleting messages: ');
    var db = req.app.locals.db;
    db.collection('messages', function (err, collection) {
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
    conn.collection('messages', function (err, collection) {
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