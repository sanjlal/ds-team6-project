var app = new Vue({
  el: '#vueBinderSite',
  data: {
    siteClasses:
    [{
      siteId: "",
        clientId: "",
        siteName: "",
        siteDescription: "",
        primaryContact: "",
        capacity: "",
        commercialDate: "",
        addrLine1: "",
        addrLine2: "",
        addrCity: "",
        addrState: "",
        addrZip: "",
        addrCountry: ""
    }]
},

  methods:{
    fetchComments(clientId) {
      console.log('ClientId at fetchComments: '+ clientId);
    //  ?taskId='+taskId
      fetch('http://ec2-35-173-222-72.compute-1.amazonaws.com/api/site.php?clientId='+clientId)
      .then((response) => response.json())
      // .then( function successCallBack2(){app.result = response.json()})
      .then(resp => {this.siteClasses=resp; console.log(this.siteClasses);})
      .catch( function (err){
        console.log('TASK FETCH ERROR');
        console.log(err);
      })
    },
    gotoTurbine(sid) {
      window.location = 'turbine.html?siteId=' + sid;
    }
  },
  created() {

    // Do data fetch
    const url = new URL(window.location.href);
    const clientId = url.searchParams.get('clientId');
    const clientName=url.searchParams.get('clientName');
    console.log('ClientId at Create: '+ clientId);
    this.fetchComments(clientId);
        this.siteClasses.addrLine2 = clientName;
    console.log('ClientName at CReate:'+this.siteClasses.addrLine2);
  //  this.insertComment();
  }
})
