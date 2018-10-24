<?php
require '../../app/common.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'clientPost.php';
  exit;
}

$turbineDeployedId = intval($_GET['turbineDeployedId'] ?? 0);
echo $turbineDeployedId;
if ($turbineDeployedId < 1) {
  throw new Exception('Invalid Task ID');
}
// 1. Go to the database and get all work associated with the $taskId
$commentArr = SensorDeployed::fetchAll($turbineDeployedId);
// 2. Convert to JSON
$json = json_encode($commentArr, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
