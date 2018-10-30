var app = new Vue({
  el: '#vueBinderSensor',
  data: {
    turbineDeployedClasses:
    [{
       turbineDeployedId: "",
       turbineId: "",
       siteId: "",
       deployedDate: "",
       totalFiredHours: "",
       totalStarts: "",
       lastPlannedOutageDate: "",
       lastUnplannedOutageDate: "",
       turbineName: "",
       turbineDescription: "",
       capacity: "",
       rampUpTime: "",
       maintenanceInterval: ""
    }],
    sensorDeployedClasses:
    [{   sensorDeployedId:"" ,
        sensorId: "",
        turbineDeployedId: "",
        serialNumber: "",
        deployedDate: ""
    }],
    sensorDetailClasses:
    [{
        sensorId: "",
        sensorName: "",
        sensorDescription: "" ,
        manufacturer: "",
        totalLifeExpentancyHours: ""
    }],
    sensorTimeSeriesClasses:
    [{
        sensorDeployedId: "",
        dataCollectedDate: "",
        output: "",
        heatRate: "",
        compressorEfficiency: "",
        availability: "",
        reliability: "",
        firedHours: "",
        trips: "",
        starts: ""
    }]
},

  methods:{
    fetchComments(siteId) {
      console.log('SiteId at fetchComments: '+ siteId);
    //  ?taskId='+taskId
      fetch('http://ec2-35-173-222-72.compute-1.amazonaws.com/api/turbineDeployed.php?siteId='+siteId)
      .then((response) => response.json())
      // .then( function successCallBack2(){app.result = response.json()})
      .then(resp => {this.turbineDeployedClasses=resp; console.log(this.turbineDeployedClasses);})

      .catch( function (err){
        console.log('TASK FETCH ERROR');
        console.log(err);
      })
    },
    fetchSensorDeployed(sensorId,turbineDeployedId) {
        console.log('SensorId at fetchSensorDeployed: '+ sensorId);
      fetch('http://ec2-35-173-222-72.compute-1.amazonaws.com/api/sensorDeployed.php?sensorId='+sensorId+'&turbineDeployedId='+turbineDeployedId)
      .then((response) => response.json())
      // .then( function successCallBack2(){app.result = response.json()})
      .then(resp => {this.sensorDeployedClasses=resp; console.log(this.sensorDeployedClasses);})

      .catch( function (err){
        console.log('TASK FETCH ERROR');
        console.log(err);
      })
    },
    fetchSensorTimeSeries(sensorId,turbineDeployedId) {
        console.log('SensorId at fetchSensorDeployed: '+ sensorId);
      fetch('http://ec2-35-173-222-72.compute-1.amazonaws.com/api/sensorTimeSeries.php?sensorId='+sensorId+'&turbineDeployedId='+turbineDeployedId)
      .then((response) => response.json())
      // .then( function successCallBack2(){app.result = response.json()})
      .then(resp => {this.sensorTimeSeriesClasses=resp; console.log(this.sensorTimeSeriesClasses.map(item => [Date.parse(item.dataCollectedDate), parseFloat(item.availability)]));
         this.formatSensorDetails();
         this.buildAvailabilityChart();
         this.buildOutputChart();
         this.buildHeatRateChart();})

      .catch( function (err){
        console.log('TASK FETCH ERROR');
        console.log(err);
      })
    },
    formatSensorDetails(){
      this.sensorTimeSeriesClasses.forEach(
        (entry, index, arr) => {
          entry.dataCollectedDate = Date.parse(entry.dataCollectedDate);
          entry.output = Number(entry.output);
          entry.heatRate = Number(entry.heatRate);
          entry.compressorEfficiency = Number(entry.compressorEfficiency);
          entry.availability = Number(entry.availability);
          entry.reliability = Number(entry.reliability);
          entry.fixedHours = Number(entry.firedHours);
          entry.trips = Number(entry.trips);
          entry.starts = Number(entry.starts);
        }
      )
    },

    buildAvailabilityChart() {

        Highcharts.chart('availabilityChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Availability %'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'availability (%)'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'availability',
                data:this.sensorTimeSeriesClasses.map( item=>
                  [item.dataCollectedDate, item.output])
            }]
        });
    },

    buildOutputChart() {
      Highcharts.chart('outputChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Output'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Output'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, "#2d9d47"],
                            [1, "#006440"]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'area',
                name: 'Output',
                data: this.sensorTimeSeriesClasses.map( item=>
                  [item.dataCollectedDate, item.output]
                )
            }]
        });
    },

    buildHeatRateChart() {
  Highcharts.chart('heatRateChart', {
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: 'Heat Rate'
    },
    xAxis: {
        title: {
            enabled: true
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Heat Rate'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        borderWidth: 1
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            }
        }
    },
    series: [{
        name: 'Heat Rate',
        color: 'rgba(223, 83, 83, .5)',
        data: this.sensorTimeSeriesClasses.map( item=>
          [item.output, item.heatRate]
        )
    }]
});
},


    fetchSensorDetails(sensorId) {
      console.log('SensorId at fetchSensorDetails: '+ sensorId);
    //  ?taskId='+taskId
      fetch('http://ec2-35-173-222-72.compute-1.amazonaws.com/api/sensor.php?sensorId='+sensorId)
      .then((response) => response.json())
      .then(resp => {this.sensorDetailClasses=resp; console.log(this.sensorDetailClasses);})

      .catch( function (err){
        console.log('TASK FETCH ERROR');
        console.log(err);
      })
    },
    gotoSensor(sensorId) {
      window.location = 'dashboard.html?sensorId=' +sensorId;
    }
  },
  created() {

    // Do data fetch
    const url = new URL(window.location.href);
    const sensorId = url.searchParams.get('sensorId');
    const turbineDeployedId = url.searchParams.get('turbineDeployedId');
    //this.fetchComments(siteId);
    this.fetchSensorDeployed(sensorId,turbineDeployedId);
    this.fetchSensorDetails(sensorId);
    this.fetchSensorTimeSeries(sensorId,turbineDeployedId);
  }
})
