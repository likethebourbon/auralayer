<?php 
header("Content-Type: application/json; charset=UTF-8");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$json = file_get_contents("php://input");
$my_json = json_decode($json);
echo $my_json->file_name;
echo json_encode($my_json->file_content);

$fp = fopen( 'saves/' . $my_json->file_name . '.auralayer', 'w');
fwrite($fp, json_encode($my_json->file_content));
fclose($fp);

?>