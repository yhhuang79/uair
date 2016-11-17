//knob
var nearby1K, nearby10M;
$(function() {
  $(".knob").knob({
    'draw' : function () {
      $(this.i).val(this.cv + '%')
    }
  })
});

//carousel
$(document).ready(function() {
    $("#owl-slider").owlCarousel({
        navigation : true,
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem : true

    });
});

//custom select box

$(function(){
    $('select.styled').customSelect();
});

$(function(){
var markerMap = {};
var map;
/* Basemap Layers */
var mapquestOSM = L.tileLayer("http://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
maxZoom: 19,
subdomains: ["otile1", "otile2", "otile3", "otile4"],
attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});

/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
spiderfyOnMaxZoom: true,
showCoverageOnHover: false,
zoomToBoundsOnClick: true,
disableClusterinAtZoom: 8
});


map = L.map("map", {
zoom: 8,
center: [25.0391667, 121.525],
layers: [mapquestOSM, markerClusters],
zoomControl: true,
attributionControl: false
});

// Setup map width
$('#map').width($('.panel-body-map').width());
var a
$.getJSON(baseURL + "/api/geojsonTI", function(data) {
var listTable;
var siteMenu = "";
var geojson = L.geoJson(data, {
  onEachFeature: function (feature, layer) {

    var wbgto_max = feature.properties.wbgto_max.toFixed(1);
    content = "<table class='table table-striped table-bordered table-condensed'>"
      + "<tr><th>測站名稱</th><td>" + feature.properties.SiteName + "監測站"
      + "</td></tr>" + "<tr><th>縣市</th><td>" + feature.properties.County
      + "</td></tr>" + "<tr><th>狀態</th><td>" + feature.properties.Status
      + "</td></tr>" + "<tr><th>WBGT</th><td>" + wbgto_max
      + "</td></tr>" + "<tr><th>濕度</th><td>" + feature.properties.RH.toFixed(1)
      + "</td></tr>" + "<tr><th>資料更新時間</th><td>" + feature.properties.PublishTime
      + "</td></tr>" + "<tr><th>地址</th><td>" + feature.properties.SiteAddres
      + "</td></tr>" + "<table>";
    layer.bindPopup(content);

    // Click event

    layer.on('click', function (e) {
      console.log("layer:click"+e.target.feature.properties);
      $("#box-1K").html((e.target.feature.properties.wbgto_max).toFixed(1));
      $("#box-10M").html((e.target.feature.properties.wbgto_max).toFixed(1));
      $("#domIdNearBy10M").html("測站周圍10公尺溫度");
      $("#domIdNearBy1K").html("測站周圍1公里溫度");
      $('#sitelocation').html("<i class=\"fa fa-laptop\"></i> 觀測站："+e.target.feature.properties.SiteName);

      if (parseFloat((e.target.feature.properties.wbgto_max).toFixed(1))<=25) {
        $("#box-1K").css("background-color","#52ff63");
        $('#alert_Tabs a[href="#alert_green"]').tab('show') // Select tab by name

      } else if ((parseFloat((e.target.feature.properties.wbgto_max).toFixed(1))>=25.1) && (parseFloat((e.target.feature.properties.wbgto_max).toFixed(1))<27)) {
        $("#box-1K").css("background-color","#ffd600");
        $('#alert_Tabs a[href="#alert_yellow"]').tab('show') // Select tab by name

      } else if ((parseFloat((e.target.feature.properties.wbgto_max).toFixed(1))>=27) && (parseFloat((e.target.feature.properties.wbgto_max).toFixed(1))<30)) {
        $("#box-1K").css("background-color","#ff8200");
        $('#alert_Tabs a[href="#alert_orange"]').tab('show') // Select tab by name

      } else if (parseFloat((e.target.feature.properties.wbgto_max).toFixed(1))>=30) {
        $("#box-1K").css("background-color","#ff5252");
        $('#alert_Tabs a[href="#alert_red"]').tab('show') // Select tab by name
      }


      if (parseFloat((e.target.feature.properties.wbgto_max).toFixed(1))<=25) {
        $("#box-10M").css("background-color","#52ff63");
      } else if ((parseFloat((e.target.feature.properties.wbgto_max).toFixed(1))>=25.1) && (parseFloat((e.target.feature.properties.wbgto_max).toFixed(1))<27)) {
        $("#box-10M").css("background-color","#ffd600");
      } else if ((parseFloat((e.target.feature.properties.wbgto_max).toFixed(1))>=27) && (parseFloat((e.target.feature.properties.wbgto_max).toFixed(1))<30)) {
        $("#box-10M").css("background-color","#ff8200");
      } else if (parseFloat((e.target.feature.properties.wbgto_max).toFixed(1))>=30) {
        $("#box-10M").css("background-color","#ff5252");
      }

      a = e;
    });
  }
});
var nearbySiteName
map.on('locationfound', function (e) {
  var radius = e.accuracy / 2;
  var myLocationIcon = new L.icon({iconUrl: 'img/currentLoc.png',iconAnchor:[14, 38]});

  //Button: Back to current
  L.easyButton('fa-user', function(btn, map){
    // debugger;
    L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();
    L.circle(e.latlng, radius).addTo(map);
    map.panTo(new L.LatLng(e.latlng.lat,e.latlng.lng));
    $("#box-1K").html(nearby1K);
    $("#box-10M").html(nearby10M);
    $("#domIdNearBy10M").html("自身周圍10公尺<br>WBGT模組");
    $("#domIdNearBy1K").html("自身周圍1公里<br>WBGT模組");
    $('#sitelocation').html("<i class=\"fa fa-laptop\"></i> 觀測站："+nearbySiteName);

    if (parseFloat(nearby1K)<=25) {
      $("#box-1K").css("background-color","#52ff63");
    } else if ((parseFloat(nearby1K)>=25.1) && (parseFloat(nearby1K)<27)) {
      $("#box-1K").css("background-color","#ffd600");
    } else if ((parseFloat(nearby1K)>=27) && (parseFloat(nearby1K)<30)) {
      $("#box-1K").css("background-color","#ff8200");
    } else if (parseFloat(nearby1K)>=30) {
      $("#box-1K").css("background-color","#ff5252");
    }
    if (parseFloat(nearby10M)<=25) {
      $("#box-10M").css("background-color","#52ff63");
    } else if ((parseFloat(nearby10M)>=25.1) && (parseFloat(nearby10M)<27)) {
      $("#box-10M").css("background-color","#ffd600");
    } else if ((parseFloat(nearby10M)>=27) && (parseFloat(nearby10M)<30)) {
      $("#box-10M").css("background-color","#ff8200");
    } else if (parseFloat(nearby10M)>=30) {
      $("#box-10M").css("background-color","#ff5252");
    }

  }).addTo(map);

  L.marker(e.latlng, {icon: myLocationIcon}).addTo(map)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();
  L.circle(e.latlng, radius).addTo(map);
  $.getJSON(baseURL + "/api/geojsonAQI", function(data) {
    var nearbyTmp,averageTmp=0, highestTmp=0, d=300000 ,d_10m=10,count=0;
    var geojson = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
          var slatlng = L.latLng(feature.geometry.coordinates[1],feature.geometry.coordinates[0]);
          //find nearest point
          if(slatlng.distanceTo(e.latlng) < d){
            nearbySiteName = feature.properties.SiteName;
            nearbyTmp = feature.properties.wbgto_max.toFixed(1);
            d = slatlng.distanceTo(e.latlng);
          }
          if(slatlng.distanceTo(e.latlng) < 10  ){
            nearby10M = feature.properties.wbgto_max.toFixed(1);
          }else{
            nearby10M = nearbyTmp;
          }
          if(slatlng.distanceTo(e.latlng) < 1000 && (slatlng.distanceTo(e.latlng) > 10)){
            nearby1K = feature.properties.wbgto_max.toFixed(1);
          }else{
            nearby1K = nearbyTmp;
          }
          if(feature.properties.wbgto_max.toFixed(1) > 0){
            averageTmp = (averageTmp+feature.properties.wbgto_max);
            count=count+1;
          }
          if( highestTmp <  feature.properties.wbgto_max){
            highestTmp  = feature.properties.wbgto_max.toFixed(1);
          }
      }
    });
    averageTmp = (averageTmp/count).toFixed();

    $('#sitelocation').html("<i class=\"fa fa-laptop\"></i> 觀測站："+nearbySiteName);

    // if((parseFloat(nearby1K)<=26.6)){
    //   // $("#box-1K").css("background-color","#ffffff");
    //   // $("#box-1K").css("color","#000000");
    //
    // } else
    $("#box-1K").html(nearby1K);

    if (parseFloat(nearby1K)<=25) {
      $("#box-1K").css("background-color","#52ff63");
    } else if ((parseFloat(nearby1K)>=25.1) && (parseFloat(nearby1K)<27)) {
      $("#box-1K").css("background-color","#ffd600");
    } else if ((parseFloat(nearby1K)>=27) && (parseFloat(nearby1K)<30)) {
      $("#box-1K").css("background-color","#ff8200");
    } else if (parseFloat(nearby1K)>=30) {
      $("#box-1K").css("background-color","#ff5252");
    }
    $("#box-10M").html(nearby10M);

    if (parseFloat(nearby10M)<=25) {
      $("#box-10M").css("background-color","#52ff63");
      $('#alert_Tabs a[href="#alert_green"]').tab('show') // Select tab by name
    } else if ((parseFloat(nearby10M)>=25.1) && (parseFloat(nearby10M)<27)) {
      $("#box-10M").css("background-color","#ffd600");
      $('#alert_Tabs a[href="#alert_yellow"]').tab('show') // Select tab by name
    } else if ((parseFloat(nearby10M)>=27) && (parseFloat(nearby10M)<30)) {
      $("#box-10M").css("background-color","#ff8200");
      $('#alert_Tabs a[href="#alert_orange"]').tab('show') // Select tab by name
    } else if (parseFloat(nearby10M)>=30) {
      $("#box-10M").css("background-color","#ff5252");
      $('#alert_Tabs a[href="#alert_red"]').tab('show') // Select tab by name
      $('#alert_red').tab('show')

    }

    //Active alert-area


    $("#box-AVR").html(averageTmp);
    if (parseFloat(averageTmp)<=25) {
      $("#box-AVR").css("background-color","#52ff63");
    } else if ((parseFloat(averageTmp)>=25.1) && (parseFloat(averageTmp)<27)) {
      $("#box-AVR").css("background-color","#ffd600");
    } else if ((parseFloat(averageTmp)>=27) && (parseFloat(averageTmp)<30)) {
      $("#box-AVR").css("background-color","#ff8200");
    } else if (parseFloat(averageTmp)>=30) {
      $("#box-AVR").css("background-color","#ff5252");
    }

    $("#box-HIGHEST").html(highestTmp);

    if (parseFloat(highestTmp)<=25) {
      $("#box-HIGHEST").css("background-color","#52ff63");
    } else if ((parseFloat(highestTmp)>=25.1) && (parseFloat(highestTmp)<27)) {
      $("#box-HIGHEST").css("background-color","#ffd600");
    } else if ((parseFloat(highestTmp)>=27) && (parseFloat(highestTmp)<30)) {
      $("#box-HIGHEST").css("background-color","#ff8200");
    } else if (parseFloat(highestTmp)>=30) {
      $("#box-HIGHEST").css("background-color","#ff5252");
    }

    function colorWBGTchanger(dom,tmp){
      if(tmp>5){
        console.log("hello >5");
      }else{
        console.log("hello <5")
      }
    }
    colorWBGTchanger(1,6);
  });
});

map.on('locationerror', function(e){
  alert("Sorry, We cannot get your current location.");
  $('#sitelocation').html("<i class=\"fa fa-laptop\"></i> 觀測站："+"");

});
geojson.addTo(map);
$('#observeStationList').html(listTable);
$('#siteMenu').html(siteMenu);
map.locate({setView: true, maxZoom: 16});

//Event: Responsive map
$(window).on('orientationchange pageshow resize', function () {
  $("#map").width($("#map-container").width());
  map.invalidateSize();
}).trigger('resize');

});

});


var chartData = []; //will be updated by our simulated server
var chartData2 = [];
var chartData3 = [];

var chart = AmCharts.makeChart("chartdiv", {
"type": "serial",
"theme": "light",
"dataDateFormat": "HH:NN:SS",
"legend": {
"useGraphSettings": true
},
"valueAxes": [{
"id": "v1",
"position": "left"
},{
"id": "v2",
"position": "left",
"axisColor": ""
},{
"id": "v3",
"position": "left",
"axisColor": "#FCD202"
},],

"graphs": [{
"id": "g1",
"bullet": "triangleUp",
"title": "X軸 重力感測器",
"valueField": "valueGX",
"balloonText": "[[category]]: [[valueGX]]",
"type": "smoothedLine"
},{
"id": "g2",
"bullet": "square",
"title": "Y軸 重力感測器",
"valueField": "valueGY",
"type": "smoothedLine",
"balloonText": "[[category]]: [[valueGY]]"
},{
"id": "g3",
"bullet": "round",
"lineColor": "#FF6600",
"title": "Ｚ軸 重力感測器",
"valueField": "valueGZ",
"type": "smoothedLine",
"balloonText": "[[category]]: [[valueGZ]]"
}],
"categoryField": "date",
"categoryAxis": {
"parseDates": false,
"equalSpacing": true,
"dashLength": 10,
"minorGridEnabled": true
},
// "startDate" :
"synchronizeGrid":true,
"dataProvider": chartData
});
var chart2 = AmCharts.makeChart("chart2div", {
"type": "serial",
"theme": "light",
"dataDateFormat": "HH:NN:SS",
"legend": {
"useGraphSettings": true
},
"valueAxes": [{
"id": "v1",
"position": "left"
},{
"id": "v2",
"position": "left",
"axisColor": ""
},{
"id": "v3",
"position": "left",
"axisColor": "#FCD202"
},],

"graphs": [{
"id": "g1",
"bullet": "triangleUp",
"title": "X軸 加速度感測器",
"valueField": "valueAX",
"type": "smoothedLine",
"balloonText": "[[category]]: [[valueAX]]"
},{
"id": "g2",
"bullet": "square",
"title": "Y軸 加速度感測器",
"valueField": "valueAY",
"type": "smoothedLine",
"balloonText": "[[category]]: [[valueAY]]"
},{
"id": "g3",
"bullet": "round",
"lineColor": "#FF6600",
"title": "Ｚ軸 加速度感測器",
"valueField": "valueAZ",
"type": "smoothedLine",
"balloonText": "[[category]]: [[valueAZ]]"
}],
"categoryField": "date",
"categoryAxis": {
"parseDates": false,
"equalSpacing": true,
"dashLength": 10,
"minorGridEnabled": true,
},
"synchronizeGrid":true,
"dataProvider": chartData
});
var chart3 = AmCharts.makeChart("chart3div", {
"type": "serial",
"theme": "light",
"dataDateFormat": "HH:NN:SS",
"legend": {
"useGraphSettings": true
},
"valueAxes": [{
"id": "v1",
"position": "left"
},{
"id": "v2",
"position": "left",
"axisColor": ""
},{
"id": "v3",
"position": "left",
"axisColor": "#FCD202"
},],

"graphs": [{
"id": "g1",
"bullet": "triangleUp",
"title": "X軸 陀螺儀感測器",
"valueField": "valueGyroX",
"type": "smoothedLine",
"balloonText": "[[category]]: [[valueGX]]"
},{
"id": "g2",
"bullet": "square",
"title": "Y軸 陀螺儀感測器",
"valueField": "valueGyroY",
"type": "smoothedLine",
"balloonText": "[[category]]: [[valueGY]]"
},{
"id": "g3",
"bullet": "round",
"lineColor": "#FF6600",
"title": "Ｚ軸 陀螺儀感測器",
"valueField": "valueGyroZ",
"type": "smoothedLine",
"balloonText": "[[category]]: [[valueGZ]]"
}],
"categoryField": "date",
"categoryAxis": {
"parseDates": false,
"equalSpacing": true,
"dashLength": 10,
"minorGridEnabled": true,
},
// "startDate" :
"synchronizeGrid":true,
"dataProvider": chartData
});


/*
* Called during the onmessage event. Your application will need
* to parse  your websocket server's response into a data object
* or array of dataObjects your chart expects
*/



var socket = io.connect("http://taiwanair.plash.tw/",{
'force new connection': true
});
var a;
var i=0
// socket.on('error', function(err) {
//     console.log("err:+"+err);
//
// });
socket.on('news', function (data) {
a = data;
// var newData = data.hello.hello.new_val.dataset.map(p=>({
//   value:p.GravityX,
//   // GRAVITY_Y:p.GRAVITY[1],
//   // GRAVITY_Z:p.GRAVITY[2,
//   date:p.Time
// }));
// var timestamp = 1293683278;


var mydate = new Date(data.hello.hello.new_val.Time*1);

var newDataGravity = [{
valueGX:data.hello.hello.new_val.GravityX,
valueGY:data.hello.hello.new_val.GravityY,
valueGZ:data.hello.hello.new_val.GravityZ,
valueAX:data.hello.hello.new_val.AccelerometerX,
valueAY:data.hello.hello.new_val.AccelerometerY,
valueAZ:data.hello.hello.new_val.AccelerometerZ,
valueGyroX:data.hello.hello.new_val.GyroscopeX,
valueGyroY:data.hello.hello.new_val.GyroscopeY,
valueGyroZ:data.hello.hello.new_val.GyroscopeZ,

date:mydate.getHours()+":"+mydate.getMinutes()+":"+mydate.getSeconds(),

}];
var newDataAccelerate = [{
valueAY:data.hello.hello.new_val.AccelerometerY,
valueAZ:data.hello.hello.new_val.AccelerometerZ,
date:mydate.getHours()+":"+mydate.getMinutes()+":"+mydate.getSeconds()
}];
var newDataGyro = [{
valueGyroX:data.hello.hello.new_val.GyroscopeX,
valueGyroY:data.hello.hello.new_val.GyroscopeY,
valueGyroZ:data.hello.hello.new_val.GyroscopeZ,
date:mydate.getHours()+":"+mydate.getMinutes()+":"+mydate.getSeconds()
}];

chartData.push.apply(chartData, newDataGravity);
chartData2.push.apply(chartData2, newDataAccelerate);
chartData3.push.apply(chartData3, newDataGyro);

// keep only 50 datapoints on screen for the demo
if (chartData.length > 10) {
chartData.splice(0, chartData.length - 10);
}
if (chartData2.length > 10) {
chartData2.splice(0, chartData2.length - 10);
}
if (chartData3.length > 10) {
chartData3.splice(0, chartData3.length - 10);
}

// writeToScreen("<span style='color: blue'>Received: " + wsEvent.data + "</span>");
chart.validateData(); //call to redraw the chart with new data
chart2.validateData(); //call to redraw the chart with new data
chart3.validateData(); //call to redraw the chart with new data

// socket.emit('my other event', { my: 'data' });
});
socket.on('predictModule',  function (data) {
//Different State: "sampling","get result"
console.log(data.hello.hello);
if(data.hello.hello == "recording"){
$('#active_pane a[href="#active_sampling"]').tab('show') // Select tab by name
}else if(data.hello.hello == "light"){
$('#active_pane a[href="#active_light"]').tab('show') // Select tab by name

}else if(data.hello.hello == "mid"){
$('#active_pane a[href="#active_moderate"]').tab('show') // Select tab by name

}else if(data.hello.hello == "heavy"){
$('#active_pane a[href="#active_heavy"]').tab('show') // Select tab by name
}
})

function rePredict() {
$.get( baseURL + "/api/rePredict", function( data ) {
$('#active_pane a[href="#active_init"]').tab('show') // Select tab by name
console.log(data);
});
}
