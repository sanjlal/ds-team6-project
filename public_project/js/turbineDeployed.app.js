var app = new Vue({
  el: '#vueBinderTurbine',
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
       maintenanceInterval: "",
       serialNumber:""
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
    fetchSensorDeployed(siteId) {
      console.log('SiteId at fetchComments: '+ siteId);
    //  ?taskId='+taskId
      fetch('http://ec2-35-173-222-72.compute-1.amazonaws.com/api/sensorDeployed.php?siteId='+siteId)
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
    gotoSensor(sensorId,turbineDeployedId) {
      console.log("At gotoSensor"+sensorId+turbineDeployedId);
      window.location = 'dashboard.html?sensorId=' +sensorId+"&turbineDeployedId="+turbineDeployedId;
    }
  },
  created() {

    // Do data fetch
    const url = new URL(window.location.href);
    const siteId = url.searchParams.get('siteId');
    const siteName=url.searchParams.get('siteName');
    document.getElementById("siteName").innerHTML = siteName;
    this.fetchComments(siteId);
  //  this.fetchSensorDeployed(siteId);
    this.fetchSensorDetails(siteId);
  }
})
