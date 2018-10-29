<?php

class SensorTimeSeries{
  public $sensorDeployedId;
  public $dataCollectedDate;
  public $output;
  public $heatRate;
  public $compressorEfficiency;
  public $availability;
  public $reliability;
  public $firedHours;
  public $trips;
  public $starts;

  public function __construct($data){
    $this->sensorDeployedId = isset($data['sensorDeployedId']) ? intval($data['sensorDeployedId']):null;
    $this->dataCollectedDate=$data['dataCollectedDate'];
    $this->output=$data['output'];
    $this->heatRate=$data['heatRate'];
    $this->compressorEfficiency=$data['compressorEfficiency'];
    $this->availability=$data['availability'];
    $this->reliability=$data['reliability'];
    $this->firedHours=$data['firedHours'];
    $this->trips=$data['trips'];
    $this->starts=$data['starts'];

  }
  public static function fetchAll(int $sensorId, int $turbineDeployedId){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from sensorTimeSeries sts, sensorDeployed sd where sts.sensorDeployedId=sd.sensorDeployedId and sensorId=? and turbineDeployedId=?';
    $statement=$db->prepare($sql);
    $success=$statement->execute([$sensorId,$turbineDeployedId]);
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSensorDeployed =  new SensorDeployed($row);
      array_push($arr, $theSensorDeployed);
    }
    return $arr;
  }

/*  public function insertDescription($clientId) {
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
