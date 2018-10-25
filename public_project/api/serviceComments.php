<?php
require '../../app/common.php';
// 1. Go to the database and get all work associated with the $taskId

$clientId = intval($_GET['clientId'] ?? 0);
if ($clientId < 1) {
  throw new Exception('Invalid Task ID');
}
$commentArr = ServiceComments::fetchAll($clientId);
// 2. Convert to JSON
$json = json_encode($commentArr, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
