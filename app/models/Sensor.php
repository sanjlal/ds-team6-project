<?php

class Sensor{
  public $sensorId;
  public $sensorName;
  public $sensorDescription;
  public $manufacturer;
  public $totalLifeExpentancyHours;

  public function __construct($data){
    $this->sensorId = isset($data['sensorId']) ? intval($data['sensorId']):null;
    $this->sensortName=$data['sensorName'];
    $this->sensorDescription=$data['sensorDescription'];
    $this->manufacturer=$data['manufacturer'];
    $this->totalLifeExpentancyHours=$data['totalLifeExpentancyHours'];
  }
  public static function fetchAll(){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from sensor';
    $statement=$db->prepare($sql);
    $success=$statement->execute();
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSensor =  new Sensor($row);
      array_push($arr, $theSensor);
    }
    return $arr;
  }

  /*public function insertDescription($clientId) {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT client(clientDescription)
            VALUES (?) where clientId =?';
    $statement = $db->prepare($sql);
    $success = $statement->execute([
      $this->clientDescription,
      $this->clientId
    ]);
  }*/


}
