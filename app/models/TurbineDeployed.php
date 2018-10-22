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

  public function __construct($data){
    $this->turbineDeployedId = isset($data['turbineDeployedId']) ? intval($data['turbineDeployedId']):null;
    $this->turbineId=$data['turbineId'];
    $this->siteId=$data['siteId'];
    $this->deployedDate=$data['deployedDate'];
    $this->totalFiredHours=$data['totalFiredHours'];
    $this->totalStarts=$data['totalStarts'];
    $this->lastPlannedOutageDate=$data['lastPlannedOutageDate'];
    $this->lastUnplannedOutageDate=$data['lastUnplannedOutageDate'];
  }
  public static function fetchAll(){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from turbineDeployed';
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
