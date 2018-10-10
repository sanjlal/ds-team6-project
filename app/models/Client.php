<?php

class Client{
  public $clientId;
  public $clientName;
  public $clientDescription;
  public $gicsSector;
  public $gicsSubIndustry;
  public $headquarters;

  public function __construct($data){
    $this->clientId = isset($data['clientId']) ? intval($data['clientId']):null;
    $this->clientName=$data['clientName'];
    $this->clientDescription=$data['clientDescription'];
    $this->gicsSector=$data['gicsSector'];
    $this->gicsSubIndustry=$data['gicsSubIndustry'];
    $this->headquarters=$data['headquarters'];
  }
  public static function fetchAll(){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from client';
    $statement=$db->prepare($sql);
    $success=$statement->execute();
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theClient =  new Comment($row);
      array_push($arr, $theClient);
    }
    return $arr;
  }

  public function insertDescription($clientId) {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT client(clientDescription)
            VALUES (?) where clientId =?';
    $statement = $db->prepare($sql);
    $success = $statement->execute([
      $this->clientDescription,
      $this->clientId
    ]);
  }


}
