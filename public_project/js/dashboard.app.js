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
         this.buildHeatRateChart();
         this.buildCompressorEfficiencyChart();
         this.buildReliabilityChart();
         this.buildFixedHourChart();
         this.buildTripsChart();
         this.buildStartsChart();})

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

buildCompressorEfficiencyChart(){

      Highcharts.chart('compressorEfficiencyChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Compressor Efficiency'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Compressor Efficiency'
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
                            [0, '#6c5b7b'],
                            [1, '#c06c84']
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
                name: 'Compressor Efficiency',
                data: this.sensorTimeSeriesClasses.map( item=>
                    [item.dataCollectedDate, item.compressorEfficiency]

                )
            }]
        });
    },
    buildReliabilityChart() {
      Highcharts.chart('reliabilityChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Reliability'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Reliability'
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
                            [0,'#f8b195'],
                            [1, '#f67280']
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
                name: 'Reliability',
                data: this.sensorTimeSeriesClasses.map( item=>
                    [item.dataCollectedDate, item.reliability]
                )
            }]
        });
    },
    buildFixedHourChart() {
      Highcharts.chart('fixedHoursChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Fixed Hour'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Fixed Hour'
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
                            [0, '#79bd8f'],
                            [1, '#c3c2f2']
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
                name: 'Fixed Hour',
                data: this.sensorTimeSeriesClasses.map( item=>
                    [item.dataCollectedDate, item.fixedHours]
                )
            }]
        });
    },
    buildTripsChart() {
      Highcharts.chart('tripsChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Trips'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Trips'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
              column: {
               pointPadding: 0.2,
               borderWidth: 0
           }
            },
            series: [{
                type: 'area',
                name: 'Trips',
                data: this.sensorTimeSeriesClasses.map( item=>
                    [item.dataCollectedDate, item.trips]
                )
            }]
        });
    },

    buildStartsChart() {
      Highcharts.chart('startsChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Starts'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Starts'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
              column: {
               pointPadding: 0.2,
               borderWidth: 0
           }
            },
            series: [{
                type: 'area',
                name: 'Starts',
                data: this.sensorTimeSeriesClasses.map( item=>
                    [item.dataCollectedDate, item.starts]
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
