<?php 
require_once '../includes/db.php'; // The mysql database connection script

session_start();
$user = $_SESSION['user'];
$id = $_SESSION['id'];
echo $id;
$query="UPDATE issue1 SET status = 'close' WHERE id='$id'";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$result = $mysqli->affected_rows;

echo $json_response = json_encode($result);

?>