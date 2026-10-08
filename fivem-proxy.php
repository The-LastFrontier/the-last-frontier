<?php
header('Content-Type: application/json');
header('Cache-Control: max-age=15');

$serverIP = '89.31.216.152';
$serverPort = '30120';

$json = @file_get_contents("http://{$serverIP}:{$serverPort}/dynamic.json");

if ($json === false) {
    // The JS checks for this and shows OFFLINE
    echo json_encode(['error' => 'offline']);
} else {
    echo $json;
}
