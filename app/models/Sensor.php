<?php

class Sensor{
  public $sensorId;
  public $sensorName;
  public $sensorDescription;
  public $manufacturer;
  public $totalLifeExpentancyHours;

  public function __construct($data){
    $this->sensorId = isset($data['sensorId']) ? intval($data['sensorId']):null;
    $this->sensorName=$data['sensorName'];
    $this->sensorDescription=$data['sensorDescription'];
    $this->manufacturer=$data['manufacturer'];
    $this->totalLifeExpentancyHours=$data['totalLifeExpentancyHours'];
  }
  public static function fetchAll(int $siteId){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from sensor s ,sensorDeployed sd,turbineDeployed td where sd.turbineDeployedId= td.turbineDeployedId and s.sensorId=sd.sensorId and td.siteId=?';
    $statement=$db->prepare($sql);
    $success=$statement->execute([$siteId]);
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
