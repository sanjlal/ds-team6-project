<?php
require '../../app/common.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'commentPost.php';
  exit;
}

$siteId = intval($_GET['siteId'] ?? 0);
//echo $turbineDeployedId;
if ($siteId < 1) {
  throw new Exception('Invalid Task ID');
}
// 1. Go to the database and get all work associated with the $taskId
$commentArr = Sensor::fetchAll($siteId);
// 2. Convert to JSON
$json = json_encode($commentArr, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
