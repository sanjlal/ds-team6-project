  var app = new Vue({
    el: '#userProfile',
    data: {
      result:
      {
        "gender": "",
        "name": {
          "title": "",
          "first": "",
          "last": ""
        },
        "location": {
          "street": "",
          "city": "",
          "state": "",
          "postcode": "",
          "coordinates": {
            "latitude": "",
            "longitude": ""
          },
          "timezone": {
            "offset": "",
            "description": ""
          }
        },
        "email": "",
        "login": {
          "uuid": "",
          "username": "",
          "password": "",
          "salt": "",
          "md5": "",
          "sha1": "",
          "sha256": ""
        },
        "dob": {
          "date": "",
          "age": ""
        },
        "registered": {
          "date": "",
          "age": ""
        },
        "phone": "",
        "cell": "",
        "id": {
          "name": "",
          "value": ""
        },
        "picture": {
          "large": "",
          "medium": "",
          "thumbnail": ""
        },
        "nat": ""
      }
  },
    computed: {
      age: function(){
        return moment().diff(moment(this.result.dob.date),'years')
      },
      dateofbirth: function(){
        return moment(this.result.dob.date).format("MMM Do YYYY")
      }
    },
    methods:{
      fetchResults() {
        fetch('https://randomuser.me/api/')
        .then((response) => response.json())
        // .then( function successCallBack2(){app.result = response.json()})
        .then(function(resp) {
          console.log(resp.results[0].name.first);
          app.result=resp.results[0]

          // app.result.gender = resp.results[0].gender;
          console.log(app.result.name.first);
        })
        .catch( function (err){
          console.log('TASK FETCH ERROR');
          console.log(err);
        })
      /*  .then( response = response.json())
        .then( json = {app.result = json})
        .catch(err =>{
          console.log('TASK FETCH ERROR');
          console.log(err);
        })*/
      }

    },
    created() {
      this.fetchResults();
    }
  })
