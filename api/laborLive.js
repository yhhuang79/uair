var app = require('./app');
// var mysocket  = app.mysocket;
var mysocket;
function  rethinkDbListener(r,connection) {
    r.table('laborSensorData').changes().run(connection, function(err, cursor) {

        cursor.each(function (err,item) {
          mysocket.emit('news', { hello: item });
          // myio.emit('news',{hello:'tony'});
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
