<?php
require '../../app/common.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'clientPost.php';
  exit;
}

$sensorId = intval($_GET['sensorId'] ?? 0);
$turbineDeployedId=intval($_GET['turbineDeployedId'] ?? 0);
//echo $turbineDeployedId;

// 1. Go to the database and get all work associated with the $taskId
$commentArr = SensorDeployed::fetchAll($sensorId,$turbineDeployedId);
// 2. Convert to JSON
$json = json_encode($commentArr, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
