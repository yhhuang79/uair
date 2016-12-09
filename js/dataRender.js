var chart
var lassData;
var probeData;
var airBoxData;
  $(function(){

    $( "#chooseSiteUl a" ).on( "click", function( event ) {

        $("#chooseDateUl").empty()
        event.preventDefault();
        // console.log( $( this ).parent().attr('value') );

        site  = $( this ).parent().attr('value');

        No1_dates=["0711","0712","0713","0714"];
        No2_dates=["0721","0722"];
        No3_dates=["0725","0726"];
        No4_dates=["0825","0826"];
        No5_dates=["0706","0720"];

        dateCollector = [No1_dates,No2_dates,No3_dates,No4_dates,No5_dates]

        append(site,dateCollector[site-1])

        function append(site,Dates){

          Dates.forEach(function(element){
            $("#chooseDateUl").append('<li value="'+element+'"><a href="#">'+element+'</a></li>')
          });

        }

        $( "#chooseDateUl a" ).on( "click", function( event ) {
          // console.log("send something")
          $('#chartdiv').css("height","550")
          $('#map').css("height","0")

          time  = "0"+$(this).parent().attr('value');
          console.log(time)
          $.post( baseURL+"/api/getAnonymousData", { siteno:site , time: time })
            .done(function( data ) {
              // console.log(data);

              var newData = data.dateData.map(function(x){
                return{
                  date:new Date(x.epoch*1000),
                  RH:x.RH,
                  SolarRadiation: x.SolarRadiation,
                  T: x.T,
                  WBGT: x.WBGT,
                  WS: x.WS,
                  epoch: x.epoch,
                  minNo: x.minNo
                }
              })

              console.log(newData)
              chart = AmCharts.makeChart("chartdiv", {
                  "type": "serial",
                  // "dataDateFormat": "HH:NN:SS",
                  "theme": "light",
                  "legend": {
                      "useGraphSettings": true
                  },
                  "dataProvider": newData,
                  "synchronizeGrid":true,
                  "valueAxes": [{
                      "id":"v1",
                      "axisColor": "#E37B46",
                      "axisThickness": 2,
                      "axisAlpha": 1,
                      "position": "left",
                      "offset":110
                  }
                  , {
                      "id":"v2",
                      "axisColor": "#D95C85",
                      "axisThickness": 2,
                      "axisAlpha": 1,
                      "position": "left"
                  }, {
                      "id":"v3",
                      "axisColor": "#DEB54D",
                      "axisThickness": 2,
                      "gridAlpha": 0,
                      "offset": 50,
                      "axisAlpha": 1,
                      "position": "left"
                  }, {
                      "id":"v4",
                      "axisColor": "#5D96DB",
                      "axisThickness": 2,
                      "gridAlpha": 0,
                      "offset": 50,
                      "axisAlpha": 1,
                      "position": "right"
                  }, {
                      "id":"v5",
                      "axisColor": "#46B29D",
                      "axisThickness": 2,
                      "gridAlpha": 0,
                      "offset": 50,
                      "axisAlpha": 1,
                      "position": "right",
                      "offset":100
                  }
                  ],
                  "graphs": [{
                      "valueAxis": "v1",
                      "lineColor": "#E37B46",
                      "bullet": "round",
                      "bulletBorderThickness": 4,
                      "hideBulletsCount": 30,
                      "title": "WBGT值",
                      "valueField": "WBGT",
                      "fillAlphas": 0
                  }
                  , {
                      "valueAxis": "v2",
                      "lineColor": "#D95C85",
                      "bullet": "square",
                      "bulletBorderThickness": 1,
                      "hideBulletsCount": 30,
                      "title": "溫度(攝氏)",
                      "valueField": "T",
                      "fillAlphas": 0
                  }, {
                      "valueAxis": "v3",
                      "lineColor": "#DEB54D",
                      "bullet": "triangleUp",
                      "bulletBorderThickness": 1,
                      "hideBulletsCount": 30,
                      "title": "太陽輻射(瓦/平方公尺)",
                      "valueField": "SolarRadiation",
                      "fillAlphas": 0
                  }, {
                      "valueAxis": "v4",
                      "lineColor": "#5D96DB",
                      "bullet": "triangleUp",
                      "bulletBorderThickness": 1,
                      "hideBulletsCount": 30,
                      "title": "風速(公尺/秒)",
                      "valueField": "WS",
                      "fillAlphas": 0
                  }, {
                      "valueAxis": "v5",
                      "lineColor": "#46B29D",
                      "bullet": "triangleUp",
                      "bulletBorderThickness": 1,
                      "hideBulletsCount": 30,
                      "title": "相對濕度(RH%)",
                      "valueField": "RH",
                      "fillAlphas": 0
                  }
                  ],
                  "chartScrollbar": {
                      // "graph": "v1",
                      // "scrollbarHeight": 80,
                      // "backgroundAlpha": 0,
                      // "selectedBackgroundAlpha": 0.1,
                      // "selectedBackgroundColor": "#888888",
                      // "graphFillAlpha": 0,
                      // "graphLineAlpha": 0.5,
                      // "selectedGraphFillAlpha": 0,
                      // "selectedGraphLineAlpha": 1,
                      // "autoGridCount": true,
                      // "color": "#AAAAAA"
                  },
                  "chartCursor": {
                      "cursorPosition": "mouse"
                  },
                  "categoryField": "date",
                  "categoryAxis": {
                      "minPeriod": "mm",
                      "parseDates": true
                  },
                  "export": {
                    "enabled": false,
                      "position": "bottom-right"
                   }
              });

              function zoomChart(){
                chart.zoomToDates((newData[0].epoch*1000),(newData[10].epoch*1000));
              }
              chart.addListener("rendered", zoomChart);




            });

        })



    });

    // var parameter = QueryString();
    // console.log(parameter)

      $('#chooseDateBox').modal('show');

    // If: get site & date
    // Show the chartData and close box
    // Else: not get site &date
    // Show the box

    $('#mapLayerBtn').click(function(){
      console.log("hello")
      $('#chartdiv').css("height","0")
      $('#map').css("height","550")

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
      // Open Weather Map layer


      // getAllLass()


      $.when(getAllLass(),getProbeCube(),getAirBox()).then(function(){
        var lassLayer = L.layerGroup(lassData);
        var probeCubeLayer = L.layerGroup(probeData);
        var airboxLayer = L.layerGroup(airBoxData);
        var overlayMaps = { "LASS": lassLayer, "ProbeCube": probeCubeLayer, "Airbox":airboxLayer };

        map = L.map("map", {
          zoom: 8,
          center: [25.0391667, 121.525],
          layers: [mapquestOSM, markerClusters, lassLayer],
          zoomControl: true,
          attributionControl: false
        });

        var layerControl = L.control.layers(overlayMaps).addTo(map);
        // Setup map width
        $('#map').width($('#dataContainer').width())

      })

    });

    function getAllLass(){
      var d1 = $.Deferred();
      $.getJSON(baseURL+"/api/getOutsideLass",function(data){
        // console.log(data);
        lassData  = data.feeds.map(  s =>  L.marker([s.gps_lat,s.gps_lon]).bindPopup(
          "<table class='table table-striped table-bordered table-condensed'>"
            + "<tr><th>測站名稱</th><td>" + s.SiteName
            + "</td></tr>" + "<tr><th>測站id</th><td>" + s.device_id
            + "</td></tr>" + "<tr><th>濕度</th><td>" + s.s_h0
            + "</td></tr>" + "<tr><th>PM2.5</th><td>" + s.s_d0
            + "</td></tr>" + "<tr><th>溫度</th><td>" + s.s_t0
            + "</td></tr>" + "<table>"

        ))
        d1.resolve();
      });
      return d1.promise();
    }
    function getProbeCube(){
      var d2 = $.Deferred();
      $.getJSON(baseURL+"/api/getOutsideProbe",function(data){
         console.log(data);
       probeData  = data.feeds.map(  s =>  L.marker([s.gps_lat,s.gps_lon]).bindPopup('This is Littleton, CO.'))
        d2.resolve();
      });
      return d2.promise();
    }
    function getAirBox(){
      var d3 = $.Deferred();
      $.getJSON(baseURL+"/api/getOutsideAirBox",function(data){
        console.log(data);
        airBoxData  = data.feeds.map(  s =>  L.marker([s.gps_lat,s.gps_lon]).bindPopup(
          "<table class='table table-striped table-bordered table-condensed'>"
            + "<tr><th>測站名稱</th><td>" + s.SiteName
            + "</td></tr>" + "<tr><th>測站id</th><td>" + s.device_id
            + "</td></tr>" + "<tr><th>濕度</th><td>" + s.s_h0
            + "</td></tr>" + "<tr><th>PM2.5</th><td>" + s.s_d0
            + "</td></tr>" + "<tr><th>溫度</th><td>" + s.s_t0
            + "</td></tr>" + "<table>"


        ))
        d3.resolve();
      });
      return d3.promise();
    }

})
