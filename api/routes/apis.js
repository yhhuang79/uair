var express = require('express');
//var fileUpload = require('express-fileupload');
var router = express.Router();
//var app = express();
// default options
//app.use(fileUpload());
var array = require('array');
var fs = require('fs');
// csv module
var json2csv = require('json2csv');
var jsonfile  = require('jsonfile');
// Static data
// Currently, we have some physical information about wbgt and airstation, like location and name.
var airstation = array();
airstation  = require('../public/sensorData/airstation.json');
var airstation_TI = array();
airstation_TI  = require('../public/sensorData/airstation.json');
var wbgt = require('../public/testData/wbgt_1hr.json');
// Labor module
var laborLive = require('../laborLive');
var laborLiveListener;
// Labor predict parameter configuration
var currentDataTime = 0;
var endrecordTime = 0;
var interval = 32000;
var predictDataSet = [];
var predictFlag = 1;
// Python shell
var PythonShell = require('python-shell');
// Socket io
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true});

// RethinkDB Connection
var r = require('rethinkdb');
var rethinkdbHost = "140.109.18.136";
var connection = null;
r.connect( {host: rethinkdbHost, port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
    laborLiveListener = laborLive.rethinkDbListener(r,connection);

});
// var laborLiveListener = laborLive.rethinkDbListener(r,connection);
// Example API
router.get('/images', function(req, res) {
    res.json({ message: "LAB第一個API!" });
});

// Get Current Air Quilty Index
  router.get('/currentAQI', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  r.table('air').filter({PublishTime: r.table('air').max('epochtime')('PublishTime')})
    .run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      //console.log(JSON.stringify(result, null, 2));
      res.json(result);
    });
  });
});

// Get Air Observe Stations Info
router.get('/stations', function(req, res) {
  res.json(airstation);
});

// Geojson with currentAQI
// Get Current Air Quilty Index
router.get('/geojsonAQI', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  r.table('air').filter({epochtime: r.table('air').max('epochtime')('epochtime')})
      .run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      console.log(result.length);
      for(var i = 0, ilen = airstation.features.length; i < ilen; i++){
        for(var j = 0, jlen = result.length; j < jlen; j++){
          if(airstation.features[i].properties.SiteName == result[j].SiteName){
            airstation.features[i].properties['PSI'] = result[j].PSI;
            airstation.features[i].properties['MajorPollutant'] = result[j].MajorPollutant;
            airstation.features[i].properties['Status'] = result[j].Status;
            airstation.features[i].properties['SO2'] = result[j].SO2;
            airstation.features[i].properties['CO'] = result[j].CO;
            airstation.features[i].properties['NO2'] = result[j].NO2;
            airstation.features[i].properties['O3'] = result[j].O3;
            airstation.features[i].properties['PM10'] = result[j].PM10;
            airstation.features[i].properties['PM2.5'] = result[j]['PM2.5'];
            airstation.features[i].properties['FPMI'] = result[j].FPMI;
            airstation.features[i].properties['PublishTime'] = result[j].PublishTime;
          }
        }
        for(var k = 0, klen = wbgt.length; k < klen; k++){
          if(airstation.features[i].properties.SiteName == wbgt[k].SiteName){
            airstation.features[i].properties['WBGT'] = wbgt[k].wbgto_max;
          }
        }
      }
      res.json(airstation);
    });
  });
});

// Geojson with currentAQI & LASS
// Get Current Air Quilty Index
router.get('/geojsonLASS', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  r.table('air').filter({epochtime: r.table('air').max({index:'epochtime'})('epochtime')})
      .run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      for(var i = 0, ilen = airstation.features.length; i < ilen; i++){
        for(var j = 0, jlen = result.length; j < jlen; j++){
          if(airstation.features[i].properties.SiteName == result[j].SiteName){
            airstation.features[i].properties['PSI'] = result[j].PSI;
            airstation.features[i].properties['MajorPollutant'] = result[j].MajorPollutant;
            airstation.features[i].properties['Status'] = result[j].Status;
            airstation.features[i].properties['SO2'] = result[j].SO2;
            airstation.features[i].properties['CO'] = result[j].CO;
            airstation.features[i].properties['NO2'] = result[j].NO2;
            airstation.features[i].properties['O3'] = result[j].O3;
            airstation.features[i].properties['PM10'] = result[j].PM10;
            airstation.features[i].properties['PM2.5'] = result[j]['PM2.5'];
            airstation.features[i].properties['FPMI'] = result[j].FPMI;
            airstation.features[i].properties['PublishTime'] = result[j].PublishTime;
          }
        }
      }
      //res.json(airstation);
    });
  });
  //{"type":"Feature","geometry":{"type":"Point","coordinates":[120.409653,23.925175000700026]},"properties":{"SiteName":"
  var d = new Date();
  var now = d.getTime()/1000 - 8*60*60;
  var past = now - 1*10
  console.log(now);
  r.db("Heat_Wave").table("LASS_rawdata")
    .hasFields(["timestamp","created_time"])
    .filter(r.row("timestamp").lt(now).and(r.row("timestamp").gt(past)))
    .without("created_time")
    .run(connection, function(err, cursor) {
      if (err) throw err;
      cursor.toArray(function(err, result) {
        if (err) throw err;
        var lassnode = array();
        lassnode = JSON.parse(JSON.stringify(airstation));
        for(var i = 0, ilen = result.length; i < ilen; i++){
          var node = {};
          var gps_lat = result[i].gps_lat;
          var gps_lon = result[i].gps_lon;
				  tmp = gps_lat - Math.floor(gps_lat);
				  tmp = tmp / 60 * 100 * 100;
				  tmp2 = tmp - Math.floor(tmp);
				  tmp2 = tmp2 * 100;
				  gps_lat = Math.floor(gps_lat) + Math.floor(tmp) * 0.01 + tmp2 * 0.0001;

				  tmp = gps_lon - Math.floor(gps_lon);
				  tmp = tmp / 60 * 100 * 100;
				  tmp2 = tmp - Math.floor(tmp);
				  tmp2 = tmp2 * 100;
				  gps_lon = Math.floor(gps_lon) + Math.floor(tmp) * 0.01 + tmp2 * 0.0001;
          node['type'] = "Feature";
          node['geometry'] = {"type":"Point","coordinates":[gps_lon,gps_lat]};
          node['properties'] = {"SiteName":result[i].device_id,"PM2.5":result[i].s_d0,"TWD97Lon":gps_lon,"TWD97Lat":gps_lat,"SiteType":"LASS"};
          console.log(JSON.stringify(node));
          lassnode.features.push(node);
      }
      res.json(lassnode);
    });
  });
});


// Geojson with seriesAQI
// Get Current Air Quilty Index
router.get('/seriesAQI/:siteName', function(req, res) {
  var siteName = req.params.siteName;

  console.log("Query SiteName : " + req.params.siteName);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  //r.table('air').filter({epochtime: r.table('air').max('epochtime')('epochtime'), })
  //r.table("air").filter({SiteName : siteName}).orderBy(r.desc("epochtime"))
  //r.table("air").filter({SiteName : siteName}).orderBy(r.desc("epochtime")).pluck(pollutant).map(r.row(pollutant)).limit(24)
  r.table("air").filter({SiteName : siteName}).orderBy(r.desc("epochtime")).limit(24)
      .run(connection, function(err, cursor) {
    if (err) throw err;
    var valueList = {
      PSI: [],
      SO2: [],
      CO: [],
      NO2: [],
      O3: [],
      PM10: [],
      PM25: [],
      FPMI: [],
      PublishTime: []
    };
    cursor.each(function(err, row) {
      if (err) throw err;
      var d = new Date(row.PublishTime);
      valueList.PSI.push(row.PSI);
      valueList.SO2.push(row.SO2);
      valueList.CO.push(row.CO);
      valueList.NO2.push(row.NO2);
      valueList.O3.push(row.O3);
      valueList.PM10.push(row.PM10);
      valueList.PM25.push(row['PM2.5']);
      valueList.FPMI.push(row.FPMI);
      valueList.PublishTime.push(d.getHours() + ":00");
      if(valueList.PSI.length == 24){
        console.log(JSON.stringify(valueList));
        res.json(valueList);
      }
    });
  });
});

// Geojson with seriesAQI
// Get Current Air Quilty Index
router.get('/weeklyStat/:siteName', function(req, res) {
  var siteName = req.params.siteName;

  console.log("Query SiteName : " + req.params.siteName);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  //r.table('air').filter({epochtime: r.table('air').max('epochtime')('epochtime'), })
  //r.table("air").filter({SiteName : siteName}).orderBy(r.desc("epochtime"))
  //r.table("air").filter({SiteName : siteName}).orderBy(r.desc("epochtime")).pluck(pollutant).map(r.row(pollutant)).limit(24)
  r.table("air").filter({SiteName : siteName})
      .run(connection, function(err, cursor) {
    if (err) throw err;
    var average = {
      Monday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Tuesday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Wednesday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Thuesday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Friday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Saturday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Sunday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
    };


    var counts = {
      Monday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Tuesday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Wednesday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Thuesday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Friday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Saturday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 },
      Sunday: { PSI: 0, SO2: 0, CO: 0, NO2: 0, O3: 0, PM10: 0, PM25: 0 }
    };
    cursor.each(function(err, row) {
      if (err) throw err;

      if (row.hasOwnProperty('PublishTime')){
        var someDay = new Date(row.PublishTime);
        var weekday = someDay.getDay();
        if (row.hasOwnProperty('PSI')){
          if (row.PSI != '') {
            switch(weekday){
              case 1:
                average.Monday.PSI += parseFloat(row.PSI);
                counts.Monday.PSI++;
                break;
              case 2:
                average.Tuesday.PSI += parseFloat(row.PSI);
                counts.Tuesday.PSI++;
                break;
              case 3:
                average.Wednesday.PSI += parseFloat(row.PSI);
                counts.Wednesday.PSI++;
                break;
              case 4:
                average.Thuesday.PSI += parseFloat(row.PSI);
                counts.Thuesday.PSI++;
                break;
              case 5:
                average.Friday.PSI += parseFloat(row.PSI);
                counts.Friday.PSI++;
                break;
              case 6:
                average.Saturday.PSI += parseFloat(row.PSI);
                counts.Saturday.PSI++;
                break;
              case 0:
                average.Sunday.PSI += parseFloat(row.PSI);
                counts.Sunday.PSI++;
                break;
            }
          }
        }
        if (row.hasOwnProperty('SO2')){
          if (row.SO2 != '') {
            switch(weekday){
              case 1:
                average.Monday.SO2 += parseFloat(row.SO2);
                counts.Monday.SO2++;
                break;
              case 2:
                average.Tuesday.SO2 += parseFloat(row.SO2);
                counts.Tuesday.SO2++;
                break;
              case 3:
                average.Wednesday.SO2 += parseFloat(row.SO2);
                counts.Wednesday.SO2++;
                break;
              case 4:
                average.Thuesday.SO2 += parseFloat(row.SO2);
                counts.Thuesday.SO2++;
                break;
              case 5:
                average.Friday.SO2 += parseFloat(row.SO2);
                counts.Friday.SO2++;
                break;
              case 6:
                average.Saturday.SO2 += parseFloat(row.SO2);
                counts.Saturday.SO2++;
                break;
              case 0:
                average.Sunday.SO2 += parseFloat(row.SO2);
                counts.Sunday.SO2++;
                break;
            }
          }
        }
        if (row.hasOwnProperty('CO')){
          if (row.CO != '') {
            switch(weekday){
              case 1:
                average.Monday.CO += parseFloat(row.CO);
                counts.Monday.CO++;
                break;
              case 2:
                average.Tuesday.CO += parseFloat(row.CO);
                counts.Tuesday.CO++;
                break;
              case 3:
                average.Wednesday.CO += parseFloat(row.CO);
                counts.Wednesday.CO++;
                break;
              case 4:
                average.Thuesday.CO += parseFloat(row.CO);
                counts.Thuesday.CO++;
                break;
              case 5:
                average.Friday.CO += parseFloat(row.CO);
                counts.Friday.CO++;
                break;
              case 6:
                average.Saturday.CO += parseFloat(row.CO);
                counts.Saturday.CO++;
                break;
              case 0:
                average.Sunday.CO += parseFloat(row.CO);
                counts.Sunday.CO++;
                break;
            }
          }
        }
        if (row.hasOwnProperty('NO2')){
          if (row.NO2 != '') {
            switch(weekday){
              case 1:
                average.Monday.NO2 += parseFloat(row.NO2);
                counts.Monday.NO2++;
                break;
              case 2:
                average.Tuesday.NO2 += parseFloat(row.NO2);
                counts.Tuesday.NO2++;
                break;
              case 3:
                average.Wednesday.NO2 += parseFloat(row.NO2);
                counts.Wednesday.NO2++;
                break;
              case 4:
                average.Thuesday.NO2 += parseFloat(row.NO2);
                counts.Thuesday.NO2++;
                break;
              case 5:
                average.Friday.NO2 += parseFloat(row.NO2);
                counts.Friday.NO2++;
                break;
              case 6:
                average.Saturday.NO2 += parseFloat(row.NO2);
                counts.Saturday.NO2++;
                break;
              case 0:
                average.Sunday.NO2 += parseFloat(row.NO2);
                counts.Sunday.NO2++;
                break;
            }
          }
        }
        if (row.hasOwnProperty('O3')){
          if (row.O3 != '') {
            switch(weekday){
              case 1:
                average.Monday.O3 += parseFloat(row.O3);
                counts.Monday.O3++;
                break;
              case 2:
                average.Tuesday.O3 += parseFloat(row.O3);
                counts.Tuesday.O3++;
                break;
              case 3:
                average.Wednesday.O3 += parseFloat(row.O3);
                counts.Wednesday.O3++;
                break;
              case 4:
                average.Thuesday.O3 += parseFloat(row.O3);
                counts.Thuesday.O3++;
                break;
              case 5:
                average.Friday.O3 += parseFloat(row.O3);
                counts.Friday.O3++;
                break;
              case 6:
                average.Saturday.O3 += parseFloat(row.O3);
                counts.Saturday.O3++;
                break;
              case 0:
                average.Sunday.O3 += parseFloat(row.O3);
                counts.Sunday.O3++;
                break;
            }
          }
        }
        if (row.hasOwnProperty('PM10')){
          if (row.PM10 != '') {
            switch(weekday){
              case 1:
                average.Monday.PM10 += parseFloat(row.PM10);
                counts.Monday.PM10++;
                break;
              case 2:
                average.Tuesday.PM10 += parseFloat(row.PM10);
                counts.Tuesday.PM10++;
                break;
              case 3:
                average.Wednesday.PM10 += parseFloat(row.PM10);
                counts.Wednesday.PM10++;
                break;
              case 4:
                average.Thuesday.PM10 += parseFloat(row.PM10);
                counts.Thuesday.PM10++;
                break;
              case 5:
                average.Friday.PM10 += parseFloat(row.PM10);
                counts.Friday.PM10++;
                break;
              case 6:
                average.Saturday.PM10 += parseFloat(row.PM10);
                counts.Saturday.PM10++;
                break;
              case 0:
                average.Sunday.PM10 += parseFloat(row.PM10);
                counts.Sunday.PM10++;
                break;
            }
          }
        }
        if (row.hasOwnProperty('PM2.5')){
          if (row['PM2.5'] != '') {
            switch(weekday){
              case 1:
                average.Monday.PM25 += parseFloat(row['PM2.5']);
                counts.Monday.PM25++;
                break;
              case 2:
                average.Tuesday.PM25 += parseFloat(row['PM2.5']);
                counts.Tuesday.PM25++;
                break;
              case 3:
                average.Wednesday.PM25 += parseFloat(row['PM2.5']);
                counts.Wednesday.PM25++;
                break;
              case 4:
                average.Thuesday.PM25 += parseFloat(row['PM2.5']);
                counts.Thuesday.PM25++;
                break;
              case 5:
                average.Friday.PM25 += parseFloat(row['PM2.5']);
                counts.Friday.PM25++;
                break;
              case 6:
                average.Saturday.PM25 += parseFloat(row['PM2.5']);
                counts.Saturday.PM25++;
                break;
              case 0:
                average.Sunday.PM25 += parseFloat(row['PM2.5']);
                counts.Sunday.PM25++;
                break;
            }
          }
        }
      }
    });

    average.Monday.PSI = parseFloat((average.Monday.PSI/counts.Monday.PSI).toFixed(2));
    average.Monday.SO2 = parseFloat((average.Monday.PSI/counts.Monday.SO2).toFixed(2));
    average.Monday.CO = parseFloat((average.Monday.CO/counts.Monday.CO).toFixed(2));
    average.Monday.NO2 = parseFloat((average.Monday.NO2/counts.Monday.NO2).toFixed(2));
    average.Monday.O3 = parseFloat((average.Monday.O3/counts.Monday.O3).toFixed(2));
    average.Monday.PM10 = parseFloat((average.Monday.PM10/counts.Monday.PM10).toFixed(2));
    average.Monday.PM25 = parseFloat((average.Monday.PM25/counts.Monday.PM25).toFixed(2));

    average.Tuesday.PSI = parseFloat((average.Tuesday.PSI/counts.Tuesday.PSI).toFixed(2));
    average.Tuesday.SO2 = parseFloat((average.Tuesday.PSI/counts.Tuesday.SO2).toFixed(2));
    average.Tuesday.CO = parseFloat((average.Tuesday.CO/counts.Tuesday.CO).toFixed(2));
    average.Tuesday.NO2 = parseFloat((average.Tuesday.NO2/counts.Tuesday.NO2).toFixed(2));
    average.Tuesday.O3 = parseFloat((average.Tuesday.O3/counts.Tuesday.O3).toFixed(2));
    average.Tuesday.PM10 = parseFloat((average.Tuesday.PM10/counts.Tuesday.PM10).toFixed(2));
    average.Tuesday.PM25 = parseFloat((average.Tuesday.PM25/counts.Tuesday.PM25).toFixed(2));

    average.Wednesday.PSI = parseFloat((average.Wednesday.PSI/counts.Wednesday.PSI).toFixed(2));
    average.Wednesday.SO2 = parseFloat((average.Wednesday.PSI/counts.Wednesday.SO2).toFixed(2));
    average.Wednesday.CO = parseFloat((average.Wednesday.CO/counts.Wednesday.CO).toFixed(2));
    average.Wednesday.NO2 = parseFloat((average.Wednesday.NO2/counts.Wednesday.NO2).toFixed(2));
    average.Wednesday.O3 = parseFloat((average.Wednesday.O3/counts.Wednesday.O3).toFixed(2));
    average.Wednesday.PM10 = parseFloat((average.Wednesday.PM10/counts.Wednesday.PM10).toFixed(2));
    average.Wednesday.PM25 = parseFloat((average.Wednesday.PM25/counts.Wednesday.PM25).toFixed(2));

    average.Thuesday.PSI = parseFloat((average.Thuesday.PSI/counts.Thuesday.PSI).toFixed(2));
    average.Thuesday.SO2 = parseFloat((average.Thuesday.PSI/counts.Thuesday.SO2).toFixed(2));
    average.Thuesday.CO = parseFloat((average.Thuesday.CO/counts.Thuesday.CO).toFixed(2));
    average.Thuesday.NO2 = parseFloat((average.Thuesday.NO2/counts.Thuesday.NO2).toFixed(2));
    average.Thuesday.O3 = parseFloat((average.Thuesday.O3/counts.Thuesday.O3).toFixed(2));
    average.Thuesday.PM10 = parseFloat((average.Thuesday.PM10/counts.Thuesday.PM10).toFixed(2));
    average.Thuesday.PM25 = parseFloat((average.Thuesday.PM25/counts.Thuesday.PM25).toFixed(2));

    average.Friday.PSI = parseFloat((average.Friday.PSI/counts.Friday.PSI).toFixed(2));
    average.Friday.SO2 = parseFloat((average.Friday.PSI/counts.Friday.SO2).toFixed(2));
    average.Friday.CO = parseFloat((average.Friday.CO/counts.Friday.CO).toFixed(2));
    average.Friday.NO2 = parseFloat((average.Friday.NO2/counts.Friday.NO2).toFixed(2));
    average.Friday.O3 = parseFloat((average.Friday.O3/counts.Friday.O3).toFixed(2));
    average.Friday.PM10 = parseFloat((average.Friday.PM10/counts.Friday.PM10).toFixed(2));
    average.Friday.PM25 = parseFloat((average.Friday.PM25/counts.Friday.PM25).toFixed(2));

    average.Saturday.PSI = parseFloat((average.Saturday.PSI/counts.Saturday.PSI).toFixed(2));
    average.Saturday.SO2 = parseFloat((average.Saturday.PSI/counts.Saturday.SO2).toFixed(2));
    average.Saturday.CO = parseFloat((average.Saturday.CO/counts.Saturday.CO).toFixed(2));
    average.Saturday.NO2 = parseFloat((average.Saturday.NO2/counts.Saturday.NO2).toFixed(2));
    average.Saturday.O3 = parseFloat((average.Saturday.O3/counts.Saturday.O3).toFixed(2));
    average.Saturday.PM10 = parseFloat((average.Saturday.PM10/counts.Saturday.PM10).toFixed(2));
    average.Saturday.PM25 = parseFloat((average.Saturday.PM25/counts.Saturday.PM25).toFixed(2));

    average.Sunday.PSI = parseFloat((average.Sunday.PSI/counts.Sunday.PSI).toFixed(2));
    average.Sunday.SO2 = parseFloat((average.Sunday.PSI/counts.Sunday.SO2).toFixed(2));
    average.Sunday.CO = parseFloat((average.Sunday.CO/counts.Sunday.CO).toFixed(2));
    average.Sunday.NO2 = parseFloat((average.Sunday.NO2/counts.Sunday.NO2).toFixed(2));
    average.Sunday.O3 = parseFloat((average.Sunday.O3/counts.Sunday.O3).toFixed(2));
    average.Sunday.PM10 = parseFloat((average.Sunday.PM10/counts.Sunday.PM10).toFixed(2));
    average.Sunday.PM25 = parseFloat((average.Sunday.PM25/counts.Sunday.PM25).toFixed(2));

    console.log(JSON.stringify(average));
    res.json(average);
  });
});

//Get Current Temperature  Index
router.get('/geojsonTI', function(req, res)  {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  r.db('Heat_Wave').table('WBGT').filter({epochtime: r.db('Heat_Wave').table('WBGT').max('epochtime')('epochtime')})
    .run(connection,  function(err, cursor) {
      if (err) {
        throw err;
      } else{
        cursor.toArray(function (err, result) {
          if (err)  throw err;
          // console.log(result.length+":result");
          // console.log(result.length+":station");

          for(var i = 0, ilen = airstation_TI.features.length; i < ilen; i++){
            for(var j = 0, jlen = result.length; j < jlen; j++){
              if(airstation_TI.features[i].properties.SiteName == result[j].SiteName){
                airstation_TI.features[i].properties['RH'] = result[j].RH;
                airstation_TI.features[i].properties['Ta'] = result[j].Ta;
                airstation_TI.features[i].properties['epochtime'] = result[j].epochtime;
                airstation_TI.features[i].properties['id'] = result[j].id;
                airstation_TI.features[i].properties['index'] = result[j].index;
                airstation_TI.features[i].properties['wbgto_max'] = result[j].wbgto_max;
                airstation_TI.features[i].properties['wbgto_min'] = result[j].wbgto_min;
                airstation_TI.features[i].properties['ws'] = result[j].ws;
              }
            }

          }
          console.log("done");
          res.json(airstation_TI);
        })
      }
    })
})
router.post('/uploadLaborDataSet', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  // console.log(JSON.stringify(req.body));
  imei = req.body.imei;
  dataSet = req.body.dataset;

  dataSet.forEach(function(value) {
    value.imei = imei;
    r.db('test').table('laborSensorData').insert(
      value
    ).run(connection,  function(err, result) {
      if(err) throw err;
    });
  })

  //
  // console.log("Get the time" +dataSet[0].Time);

  // Predict Module

  currentDataTime = parseInt(dataSet[0].Time)
  console.log("Start, time is  "+currentDataTime);
  console.log("And EndFrame is "+endrecordTime)

  console.log("===compare_resule===");
  console.log("Start:"+(Math.floor(currentDataTime/1000)));
  console.log("End:  "+(Math.floor(endrecordTime/1000)));
  console.log("")
  if(predictFlag != 0){
    if(currentDataTime > endrecordTime ){
      // Todo: Start record
      predictDataSet =  [];
      endrecordTime = currentDataTime + interval;
      //Todo: push data into array

    }
    else if(Math.round(currentDataTime/1000) == Math.round(endrecordTime/1000)){
      //Todo: Stop recording
      // Set predicting flag as 1
      // 1. Saving file
      // 2. Calling predict module
      // 3. Returning predict result
      predictFlag=0;
      fs.writeFile('/tmp/5_sec_data.json', JSON.stringify(predictDataSet), function(err) {
        if (err) throw err;
        console.log("--Stop--SaveFile!!!!!!!!")
        //  2. call module
        var options = {
          args: ['/tmp/5_sec_data.json'],
          scriptPath: '/'
        };
        PythonShell.run('/var/nginx/uair/api/predictModule/model.py', options, function (err, results) {
          if (err) throw err;
          // results is an array consisting of messages collected during execution
          console.log('results: %j', results);
          socket.emit('toSendState', {hello:results[0]})
        });
        // 3. Returning result
      });
    }
    else if(currentDataTime <endrecordTime){
      //Todo: Recording
      // 1.push data into array
      console.log("--Recording")
      dataSet.forEach(function(value){
        value.imei = imei;
        predictDataSet.push(value);
      })
      socket.emit('toSendState', { hello: "recording" });

    }
  }else{
    //predict done
  }


  res.send("hello_pica")

});
router.post('/uploadDiaryDataSet', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  imei = req.body.imei;
  dataSet = req.body.dataset;

  dataSet.forEach(function(value) {
    value.imei = imei;
    r.db('test').table('Plash_intern_diary').insert(
      value
    ).run(connection,  function(err, result) {
      if(err) throw err;
    });
  })
  res.send("hello_pica")
});
router.get('/getInternData',  function  (req, res)  {
  fs.readFile('/home/athung/python/prediction.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    res.send(data);
  });
});

router.get('/getAirInferenceData',function  (req, res)  {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  r.db('test').table('TestDataforAirPullMap').run(connection, function(err,cursor){
    if (err)  throw err;
    else{
      cursor.toArray(function(err,  result){
        res.send(result)
      })
    }
  })
})

router.get('/rePredict',function  (req, res)  {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  //set flag as init;
  predictFlag = 1;
  res.send("reset!")

})

router.get('/getAirResearchPrediction',function  (req, res)  {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  // reference address
  dbName  = 'test'
  tableName = 'air_research_test_input'

  // extract request header
  SiteEngName = req.headers.siteengname
  epoch_time  = req.headers.epoch_time

  r.db(dbName).table(tableName).filter({
    "SiteEngName":  SiteEngName ,
    "epoch_time":  epoch_time
  }).run(connection,  function(err, cursor) {
    if (err)  throw err;
    else{
      cursor.toArray(function(err,  result){
        json2csv({data: result, fields: ["AvgSpd","CO","FPMI","NO2","PM10","PM25","PSI","RH","SO2","SiteEngName","TotalVol","col","dew_point",
        "globlrad","grid_index","hw_len","id","num_intersection","precp","precp_hour","rd_len","row","sea_press","sn_press","sun_shine_hour",
        "temperature","time","visb","wd","wd_gust","ws","ws_gust","epoch_time"]}, function(err, csv) {
          if (err) console.log(err);
          fs.writeFile('file.csv', csv, function(err) {
            if (err) throw err;
            res.send('file saved');
          });
        });
      })
    }
  });


})


module.exports = router;
