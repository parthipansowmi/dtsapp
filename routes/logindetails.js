exports.storeLogindetails = function (req, res) {
    var data = req.body;
    var db = req.app.locals.db;
   
    console.log('Adding logindetails: ' + JSON.stringify(data));
    db.collection('logindetails', function (err, collection) {
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


exports.deleteLogindetails = function (req, res) {
    var id = req.query.code;
    console.log('Deleting logindetails: ' + id);
    var db = req.app.locals.db;
    db.collection('logindetails', function (err, collection) {
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

    exports.findLoginDetails = function (req, res) {
    var email = req.query.userEmail;
    
    var status = 'true';
    console.log("email: "+email);
    
    var conn = req.app.locals.db;
    conn.collection('logindetails', function (err, collection) {
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

exports.updateLogoutTime = function (req, res) {
     //var userEmail = req.query.email;
     var logouttime = req.body.logouttime;
     var sessionid = req.body.sessionid;
    
    console.log("sessionid: "+sessionid);
       
    console.log("Updating collection- logout details ....");
    var db = req.app.locals.db;
    db.collection('logindetails', function (err, collection) {

        collection.findAndModify( {  "sessionid": sessionid },  [['_id','asc']],  {$set:  { "logouttime" : logouttime}}, function (err, result) {
            if (err) {                
                console.log('Error updating logout time: ' + err);
                res.send('false');

            } else {
                console.log('' + JSON.stringify(result) + ' document(s) updated');
                res.send('true');            }
        }); 
    });
}

exports.storeInvalidLogin = function (req, res) {
    var data = req.body;
    var db = req.app.locals.db;
   
    console.log('Adding Involid logindetails: ' + JSON.stringify(data));
    db.collection('logindetails', function (err, collection) {
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

