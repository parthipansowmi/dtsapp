

//var react = require('react');

exports.checkCredential = function (req, res) {
    console.log("http data" + req.params);
    var email = req.query.email;
    var password = req.query.password;
    var conn = req.app.locals.db;
    var login = false;
    //var collection =
    console.log('Retrieving email: ' + email);
    conn.collection('providerlogin', function (err, collection) {
        if (err) {
            console.log(" Error in opening collections");
            errorMessage = err.message;
            console.log("DB" + errorMessage);
        }

        else {
            collection.find({ "email": email, "password": password }).toArray(function (err, docs) {
                console.log(docs);
                if (!err & docs.length == 1)
                    login = true;
                else
                    login = false;
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
    conn.collection('providerlogin',function (err, collection) {
        collection.find({ "email": email}).toArray(function (err, items) {
            if (items.length == 1)
                    login = true;
                else
                    login = false;
            res.send(login);
        });
    });
};

exports.addproviderlogin = function (req, res) {
    var userData = req.body;
    var db = req.app.locals.db;
    console.log('Adding providerlogin: ' + JSON.stringify(userData));
    db.collection('providerlogin', function (err, collection) {
        collection.insert(userData, { safe: true }, function (err, result) {
            if (err) {
                res.send('false');
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send('true');
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
    db.collection('providerlogin', function (err, collection) {

        collection.findAndModify( { "email" :  userEmail },  [['_id','asc']],  {$set:  { "password" : password }}, function (err, result) {
            if (err) {
                console.log('Error updating providerlogin: ' + err);
                res.send('false');
            } else {
                console.log('' + JSON.stringify(result) + ' document(s) updated');
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
    console.log("Updating collection ....");
    db.collection('providerlogin', function (err, collection) {

        collection.findAndModify( { "email" :  userEmail },  [['_id','asc']],  {$set:  { "email" : newemail }}, function (err, result) {
            if (err) {
                console.log('Error updating providerlogin: ' + err);
                res.send('false');
            } else {
                console.log('' + JSON.stringify(result) + ' document(s) updated');
                res.send('true'); 
            }
        }); 
    });
}

exports.deleteproviderlogin = function (req, res) {
    var email = req.query.email;
     var db = req.app.locals.db;
     console.log( " Request Parameters: "+req.query.email)
    console.log('Deleting providerlogin: ' + email);
    db.collection('providerlogin', function (err, collection) {
        collection.remove({ 'email': email }, { safe: true }, function (err, result) {
            if (err || result == 0) {
                res.send({ 'error': 'An error has occurred - ' + err });
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}