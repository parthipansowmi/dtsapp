//var react = require('react');

exports.addNewserviceProvider = function (req, res) {
    var data = req.body;
    var db = req.app.locals.db;
    console.log('Adding serviceProvider: ' + JSON.stringify(data));
    db.collection('serviceProvider', function (err, collection) {
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


exports.deleteserviceProvider = function (req, res) {
    var email = req.query.email;
    console.log('Deleting serviceProvider: ' + email);
     var db = req.app.locals.db;
    db.collection('serviceProvider', function (err, collection) {
        
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

exports.findserviceProvider = function (req, res) {
    var email = req.query.email;
    var status;
    console.log("email: "+email);
    //console.log("serviceProvider"+serviceProvider);
    var conn = req.app.locals.db;
    conn.collection('serviceProvider', function (err, collection) {
        collection.find( {"email": email}).toArray(function (err, items) {
        	if ( err || items.length < 1)
        	{
        		status = false;
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

 exports.searchByType = function (req, res) {
    var servicetype = req.query.servicetype;
    var status;
    console.log("servicetype: "+servicetype);
    //console.log("serviceProvider"+serviceProvider);
    var conn = req.app.locals.db;
    conn.collection('serviceProvider', function (err, collection) {
        collection.find( {"servicetype": servicetype}).toArray(function (err, items) {
            if ( err || items.length < 1)
            {
                status = false;
                res.send('{ "error" : "No service proviider available for this category');
            }
            else
            {
                status=true;
                res.send(items);
            }
        });
    });
};

exports.updateEmail = function (req, res) {
     var userEmail = req.query.email;
     var newEmail = req.query.newemail
    var db = req.app.locals.db;
    console.log("Email: "+userEmail);
    console.log("New Email: "+newEmail);
    
    console.log("Updating collection- updateEmail - serviceProvider ....");
    db.collection('serviceProvider', function (err, collection) {

        collection.findAndModify( { "email" :  userEmail },  [['_id','asc']],  {$set:  { "email" : newEmail}}, function (err, result) {
            if (err) {                
                console.log('Error updating providerlogin: ' + err);
                res.send('false');

            } else {
                console.log('' + JSON.stringify(result) + ' document(s) updated');
                res.send('true');            }
        }); 
    });
}

exports.updatePhone = function (req, res) {
     var userEmail = req.query.email;
     var newphone = req.query.newphone;
    var db = req.app.locals.db;
    console.log("Email: "+userEmail);
    
    console.log("Updating collection- updateEmail - serviceProvider ....");
    db.collection('serviceProvider', function (err, collection) {

        collection.findAndModify( { "email" :  userEmail },  [['_id','asc']],  {$set:  { "phone" : newphone}}, function (err, result) {
            if (err) {               
                console.log('Error updating providerlogin: ' + err);
                res.send('false');

            } else {
                console.log('' + JSON.stringify(result[0]) + ' document(s) updated');
                res.send('true'); 
            }
        }); 
    });
}

