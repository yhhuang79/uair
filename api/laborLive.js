// var app = require('./app');
// var mysocket  = app.mysocket;
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true});
var mysocket;


function  rethinkDbListener(r,connection) {

    r.table('laborSensorData').changes().run(connection, function(err, cursor) {

        cursor.each(function (err,item) {
          // socket.on('connect', function (socket) {
          //     console.log('Server Connected!');
          // });
          socket.emit('toClient', { hello: item });
          // myio.emit('news',{hello:'tony'});
          // console.log(item);
        }
      );

    });

}
function WSConstruct(socket) {
  mysocket  = socket;
}
module.exports  = {

  rethinkDbListener : function(r,connection) {
      return  rethinkDbListener(r,connection);
  },
  WSConstruct : function(socket){
    return  WSConstruct(socket);
  }

}
