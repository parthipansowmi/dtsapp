
//var react = require('react');

exports.checkCredential = function (req, res) {
    console.log("http data" + req.params);
    var email = req.query.usernameOrEmail;
    var password = req.query.password;
    var conn = req.app.locals.db;
    var login = 'false';
    
    console.log('Retrieving email: ' + email);
    console.log('Password: '+password);
    conn.collection('userProfile', function (err, collection) {
        if (err) {
            console.log(" Error in opening collections");
            errorMessage = err.message;
            console.log("DB" + errorMessage);
        }

        else {
            collection.find({ "userEmail": email, "password": password }).toArray(function (err, docs) {
                console.log("Document: "+docs.length);
                if (err)
                    login='false';
                if (docs.length == 1)
                    login = 'true';
                else
                    login = 'false';
                console.log("Credential status: "+login);
                res.send(login);
            });
        }
    });
};

exports.findEmail = function (req, res) {
    console.log(req.params);
    var email = req.query.email;
    var conn = req.app.locals.db;
    var login = false;
    conn.collection('userProfile',function (err, collection) {
        collection.find({ "userEmail": email}).toArray(function (err, items) {
            console.log(" No. Documents: "+items.length);
            if (items.length == 1)
                    login = true;
                else
                    login = false;
            res.send(login);
        });
    });
};

exports.adduserProfile = function (req, res) {
    var userData = req.body;
    console.log('Adding userProfile: ' + JSON.stringify(userData));
    var db = req.app.locals.db;
    db.collection('userProfile', function (err, collection) {
        collection.insert(userData, { safe: true }, function (err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}


exports.updatenewPassword = function (req, res) {
    var password = req.query.newpass;
    var userEmail = req.query.email;
    var db = req.app.locals.db;
    console.log("Email: "+userEmail);
    console.log("Password: "+password);
    console.log("Updating collection ....");
    db.collection('userProfile', function (err, collection) {

        collection.findAndModify( { "userEmail" :  userEmail },  [['_id','asc']],  {$set:  { "password" : password }}, function (err, result) {
            if (err) {
                console.log('Error updating userProfile: ' + err);
                res.send('false');
            } else {
                console.log('' + result+ ' document(s) updated');
                res.send('true'); 
            }
        }); 
    });
}

exports.updatenewEmail = function (req, res) {
    var newemail = req.query.newemail;
    var userEmail = req.query.email;
    var db = req.app.locals.db;
    console.log("Email: "+userEmail);
    console.log("Password: "+password);
    console.log("Updating collection ....");
    db.collection('userProfile', function (err, collection) {

        collection.findAndModify( { "userEmail" :  userEmail },  [['_id','asc']],  {$set:  { "userEmail" : newemail }}, function (err, result) {
            if (err) {
                console.log('Error updating New Email: ' + err);
                res.send('false');
            } else {
                console.log('' + result+ ' document(s) updated');
                res.send('true'); 
            }
        }); 
    });
}


exports.deleteuserProfile = function (req, res) {
    var id = req.params.id;
     var db = req.app.locals.db;
    console.log('Deleting userProfile: ' + id);
    db.collection('userProfile', function (err, collection) {
        collection.remove({ '_id': new BSON.ObjectID(id) }, { safe: true }, function (err, result) {
            if (err || result == 0) {
                res.send({ 'error': 'An error has occurred - ' + err });
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}