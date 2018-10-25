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
    }],
    commentClasses:
    [ {
        commentId: "",
        clientId: "",
        comments: ""
    }]
},

  methods:{
    fetchSite(clientId) {
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

    gotoTurbine(sid,sname) {
      window.location = 'turbine.html?siteId=' + sid+"&siteName="+sname;;
    },


    insertComment(){
    console.log("Comment called");
    fetch('http://ec2-35-173-222-72.compute-1.amazonaws.com/api/serviceComments.php', {
      method : "POST",
      body : JSON.stringify(
        {comment:document.getElementById('comment').value,
        clientId:document.getElementById('clientId').value}),
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

},

fetchComments(clientId) {
  fetch('http://ec2-35-173-222-72.compute-1.amazonaws.com/api/serviceComments.php?clientId='+clientId)
  .then((response) => response.json())
  // .then( function successCallBack2(){app.result = response.json()})
  .then(resp => {this.commentClasses=resp; console.log(this.commentClasses);})
  .catch( function (err){
    console.log('TASK FETCH ERROR');
    console.log(err);
  })
}

  },
  created() {

    // Do data fetch
    const url = new URL(window.location.href);
    const clientId = url.searchParams.get('clientId');
    const clientName=url.searchParams.get('clientName');
    console.log('ClientId at Create: '+ clientId);

    document.getElementById("clientName").innerHTML = clientName;
    document.getElementById("clientId").innerHTML = clientId;

    this.fetchComments(clientId);
    this.fetchSite(clientId);
        this.siteClasses.addrLine2 = clientName;
    console.log('ClientName at CReate:'+this.siteClasses.addrLine2);
  //  this.insertComment();
  }
})
