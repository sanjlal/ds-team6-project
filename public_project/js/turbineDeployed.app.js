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
       maintenanceInterval: ""
    }],
    siteDeployedClasses:
    [{   sensorDeployedId:"" ,
        sensorId: "",
        turbineDeployedId: "",
        serialNumber: "",
        deployedDate: ""
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

      const turbineDeployedId =this.turbineDeployedClasses.turbineDeployedId;
      fetch('http://ec2-35-173-222-72.compute-1.amazonaws.com/api/sensorDeployed.php?turbineDeployedId='+turbineDeployedId)


    },
    insertComment(){
        fetch('http://ec2-34-238-138-223.compute-1.amazonaws.com/api/comment.php', {
          method : "POST",
          body : JSON.stringify(
            {comment:document.getElementById('comment').value}),
          headers : {
            'Content-type': 'application/json; charset=utf-8'
          }
        })

        .then(function(resp) {
          console.log(resp.json())
        })
        .catch( function (err){
          console.log('TASK FETCH ERROR');
          console.log(err);
        });

    }
  },
  created() {

    // Do data fetch
    const url = new URL(window.location.href);
    const siteId = url.searchParams.get('siteId');
    this.fetchComments(siteId);

  }
})
