//var mongodb = require('mongodb');
//var MongoClieant = mongodb.MongoClient;
//var users;
//var url = 'mongodb://localhost:27017/TestApi';
//
//MongoClieant.connect(url, function(err, db){
//    if(err){
//        console.log('Unable to connect to the mongoDB server. Error:', err);
//    } else {
//        //HURRAY!! We are connected. :)
//        console.log('Connection established to', url);
//
//        // Get the documents collection
//        var collection = db.collection('users');
//
//        //Create some users
//        var user1 = {name: 'Andi Deris', email: 'test@test.com', ip: '196.168.00.01', result:56};
//        var user2 = {name: 'Michael Weikath', email: 'test1@test.com', ip: '196.168.00.02', result:26};
//        var user3 = {name: 'Roland Grapow', email: 'test2@test.com', ip: '196.168.00.03', result:36};
//
//        // Insert some users
//        collection.insert([user1, user2, user3], function (err, result) {
//            if (err) {
//                console.log(err);
//            } else {
//                users = result;
//                console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
//            }
//            //Close connection
//            db.close();
//        });
//    }
//    //console.log(users);
//});

