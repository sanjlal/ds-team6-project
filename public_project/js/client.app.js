var app = new Vue({
  el: '#vueBinderClient',
  data: {
    clientClasses:
    [{
      clientId: "",
        clientName: " ",
        clientDescription: "",
        gicsSector: "",
        gicsSubIndustry: "",
        headquarters: ""
    }]
},

  methods:{
    fetchComments() {
      fetch('http://ec2-35-173-222-72.compute-1.amazonaws.com/api/client.php')
      .then((response) => response.json())
      // .then( function successCallBack2(){app.result = response.json()})
      .then(resp => {this.clientClasses=resp; console.log(this.clientClasses);})
      .catch( function (err){
        console.log('TASK FETCH ERROR');
        console.log(err);
      })
    },
    //?param1="+lat+"&param2="+lon);
    gotoSite(cid,cname) {
      window.location = 'site.html?clientId=' + cid+"&clientName="+cname;
    }
  },
  created() {
    this.fetchComments();
  //  this.insertComment();
  }
})
