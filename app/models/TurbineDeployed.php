<?php

class TurbineDeployed{
  public $turbineDeployedId;
  public $turbineId;
  public $siteId;
  public $deployedDate;
  public $totalFiredHours;
  public $totalStarts;
  public $lastPlannedOutageDate;
  public $lastUnplannedOutageDate;

  public $turbineName;
  public $turbineDescription;
  public $capacity;
  public $rampUpTime;
  public $maintenanceInterval;

  public function __construct($data){
    $this->turbineDeployedId = isset($data['turbineDeployedId']) ? intval($data['turbineDeployedId']):null;
    $this->turbineId=$data['turbineId'];
    $this->siteId=$data['siteId'];
    $this->deployedDate=$data['deployedDate'];
    $this->totalFiredHours=$data['totalFiredHours'];
    $this->totalStarts=$data['totalStarts'];
    $this->lastPlannedOutageDate=$data['lastPlannedOutageDate'];
    $this->lastUnplannedOutageDate=$data['lastUnplannedOutageDate'];

    $this->turbineName=$data['turbineName'];
    $this->turbineDescription=$data['turbineDescription'];
    $this->capacity=$data['capacity'];
    $this->rampUpTime=$data['rampUpTime'];
    $this->maintenanceInterval=$data['maintenanceInterval'];
  }
  public static function fetchAll(){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT turbineDeployedId,
   td.turbineId,
   siteId,
   deployedDate,
   totalFiredHours,
   totalStarts,
   lastPlannedOutageDate,
   lastUnplannedOutageDate,
   turbineName,
   turbineDescription,
   capacity,
   rampUpTime,
   maintenanceInterval
   from turbineDeployed td, turbine t
   where td.turbineId=t.turbineId
   and siteId=1';
    $statement=$db->prepare($sql);
    $success=$statement->execute();
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theTurbineDeployed =  new TurbineDeployed($row);
      array_push($arr, $theTurbineDeployed);
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
