var app = require('./app');
var io  = app.io;
function  rethinkDbListener(r,connection) {
    r.table('laborSensorData').changes().run(connection, function(err, cursor) {

        cursor.each(function (err,item) {
          io.socket.emit('news',  item);

        }
      );

    });

}

module.exports  = {

  rethinkDbListener : function(r,connection) {
      return  rethinkDbListener(r,connection);
  }

}
