var server = require('net').createServer();
var request_manager = require('./manager/request_manager');
var db = require('./config/database');
var port = 5476;

db.connect(function(db){
    if(db != false){
        server.on('listening', function(){
            console.log('server listening in port ' + port);
        });

        server.on('connection', function(socket){
            console.log('Server has a new connection');
            socket.on('data', function(data){
                var data = JSON.parse(data);
                data.socket = socket;
                request_manager.process_request(db, data, function(response){
                    if(response != null)
                    socket.write(JSON.stringify(response));
                });
            });
            
        });

        server.on('error', function(err) {
            console.log('Server error:', err.message);
        });

        server.on('close', function() {
            console.log('Server closed');
        });

        server.listen(port);
    }
});

