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
    fetchSensorDeployed(siteId,turbineDeployedId) {
      console.log('SiteId at fetchComments: '+ siteId);
    //  ?taskId='+taskId
    //+"&turbineDeployedId="+turbineDeployedId;

      fetch('http://ec2-35-173-222-72.compute-1.amazonaws.com/api/sensorDeployed.php?siteId='+siteId+'&turbineDeployedId='+turbineDeployedId)




      /*fetch('http://ec2-34-238-138-223.compute-1.amazonaws.com/api/comment.php', {
          method : "POST",
          body : JSON.stringify(
            {comment:document.getElementById('comment').value}),
          headers : {
            'Content-type': 'application/json; charset=utf-8'
          }
        })*/


      .then((response) => response.json())
      // .then( function successCallBack2(){app.result = response.json()})
      .then(resp => {this.sensorDeployedClasses=resp; console.log(this.sensorDeployedClasses);})

      .catch( function (err){
        console.log('TASK FETCH ERROR');
        console.log(err);
      })
    },
    fetchSensorDetails(siteId) {
      console.log('SiteId at fetchComments: '+ siteId);
    //  ?taskId='+taskId
      fetch('http://ec2-35-173-222-72.compute-1.amazonaws.com/api/sensor.php?siteId='+siteId)
      .then((response) => response.json())
      // .then( function successCallBack2(){app.result = response.json()})
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
  }
})
