var app = new Vue({
  el: '#vueBinder',
  data: {
    commentClasses:
    [{
      id: "",
      comment:""
    }]
},

  methods:{
    fetchComments() {
      fetch('http://ec2-34-238-138-223.compute-1.amazonaws.com/api/comment.php')
      .then((response) => response.json())
      // .then( function successCallBack2(){app.result = response.json()})
      .then(resp => {this.commentClasses=resp; console.log(this.commentClasses);})
      .catch( function (err){
        console.log('TASK FETCH ERROR');
        console.log(err);
      })
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
    this.fetchComments();
  //  this.insertComment();
  }
})
