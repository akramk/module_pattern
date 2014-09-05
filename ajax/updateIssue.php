<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['update'])){
$update = $_GET['update'];


session_start();
$user = $_SESSION['user'];
$id = $_SESSION['id'];
$query= "INSERT INTO `issue_update`(`id`, `issueUpdate`, `postedBy`, `status`) VALUES ('$id', '$update', '$user', 'open')";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
echo $user;
echo $id;
echo $update;

$result = $mysqli->affected_rows;

echo $json_response = json_encode($result);
}
?>