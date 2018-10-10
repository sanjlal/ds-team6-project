<?php

class Turbine{
  public $turbineId;
  public $turbineName;
  public $turbineDescription;
  public $capacity;
  public $rampUpTime;
  public $maintenanceInterval;

  public function __construct($data){
    $this->turbineId = isset($data['turbineId']) ? intval($data['turbineId']):null;
    $this->turbineName=$data['turbineName'];
    $this->turbineDescriptionn=$data['turbineDescription'];
    $this->capacity=$data['capacity'];
    $this->rampUpTime=$data['rampUpTime'];
    $this->maintenanceInterval=$data['maintenanceInterval'];
  }
  public static function fetchAll(){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from turbine';
    $statement=$db->prepare($sql);
    $success=$statement->execute();
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theTurbine =  new Turbine($row);
      array_push($arr, $theTurbine);
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
