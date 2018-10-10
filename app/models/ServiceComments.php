<?php

class ServiceComments{
  public $commentId;
  public $clientId;
  public $comments;

  public function __construct($data){
    $this->commentId = isset($data['commentId']) ? intval($data['commentId']):null;
    $this->clientId=$data['clientId'];
    $this->comments=$data['comments'];
  }
  public static function fetchAll(){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from serviceComments';
    $statement=$db->prepare($sql);
    $success=$statement->execute();
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theserviceComments =  new ServiceComments($row);
      array_push($arr, $theserviceComments);
    }
    return $arr;
  }

  public function insertServiceComments() {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT serviceComments (clientId,comments)
            VALUES (?,?)';
    $statement = $db->prepare($sql);
    $success = $statement->execute([
      $this->clientId,
      $this->comments
    ]);
     $this->commentId = $db->lastInsertId();
  }


}
