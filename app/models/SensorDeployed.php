<?php

class SensorDeployed{
  public $sensorDeployedId;
  public $sensorId;
  public $turbineDeployedId;
  public $serialNumber;
  public $deployedDate;

  public function __construct($data){
    $this->sensorDeployedId = isset($data['sensorDeployedId']) ? intval($data['sensorDeployedId']):null;
    $this->sensorId=$data['sensorId'];
    $this->turbineDeployedId=$data['turbineDeployedId'];
    $this->serialNumber=$data['serialNumber'];
    $this->deployedDate=$data['deployedDate'];
  }
  public static function fetchAll(int $sensorId, int $turbineDeployedId){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from sensorDeployed sd,turbineDeployed td, sensor s where sd.turbineDeployedId= td.turbineDeployedId and s.sensorId= sd.sensorId and td.turbineDeployedId=? and s.sensorId=?';
    $statement=$db->prepare($sql);
    $success=$statement->execute([$turbineDeployedId,$sensorId]);
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSensorDeployed =  new SensorDeployed($row);
      array_push($arr, $theSensorDeployed);
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
  }
*/

}
