<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['user'])){
$user = $_GET['user'];
$password = $_GET['password'];
$status = "0";
$created = time();
console.log($user+$password);
$query="INSERT INTO user(username,password,status,created_at)  VALUES ('$user', '$password', '$status', '$created')";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$result = $mysqli->affected_rows;

echo $json_response = json_encode($result);
}
?>