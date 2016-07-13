// var app = require('./app');
// var mysocket  = app.mysocket;
var io = require('socket.io-client');

var mysocket;
var socket = io.connect('http://localhost:3000', {reconnect: true});

var currentDataTime=0;
var lastDataTime=0;
function  rethinkDbListener(r,connection) {

    r.table('laborSensorData').changes().run(connection, function(err, cursor) {

        cursor.each(function (err,item) {
          // socket.on('connect', function (socket) {
          //     console.log('Server Connected!');
          //
          // });
          // socket.emit('toClient', { hello: item });
          // myio.emit('news',{hello:'tony'});
          currentDataTime = (item.new_val.dataset.Time/1000).toFixed(0);
          //  Compare
          if(currentDateTime  > lastDataTime){
            lastDataTime  = currentDateTime;
            console.log("send!");
          }
          // console.log(item.new_val.dataset.Time);
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
