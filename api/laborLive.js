function  rethinkDbListener(r,connection){
  r.table('laborSensorData').changes().run(connection, function(err, cursor) {
    cursor.each(console.log);
  });
}
module.exports  = {

  rethinkDbListener : function(r,connection) {
      return  rethinkDbListener(r,connection);
  }

}
