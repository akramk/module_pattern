<?php 
require_once '../includes/db.php'; // The mysql database connection script
$status = '%';
if(isset($_GET['name'])){
$name = $_GET['name'];
}
$date = $_GET['date'];
$description = $_GET['description'];
$list= $_GET['list'];
$value = $_GET['value'];
session_start();
$user = $_SESSION['user'];
echo $name. $date .$description ;
echo "\n";
echo $list;

print_r (explode(",",$list));
$val = explode(",",$list);

$task = explode(",",$value);



$query="INSERT INTO issue1(issuename,description,createdBy,status)  VALUES ('$name', '$description', '$user', 'open')";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$query="SELECT id FROM issue1 WHERE issuename= '$name'";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
$id;

$arr = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
	$id = $row["id"];
	}
}

for ($i =0; $i<count($val); $i++){
$query="INSERT INTO issue_persmission(id,username,assigned)  VALUES ('$id', '$val[$i]', '$task[$i]')";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
}


echo "\n";
echo count($task);
//$query="select NAME, DESCRIPTION from issue where createdBy like '$user' ";
/*$query = "SELECT issue_update.id as ID, issue_update.issueUpdate as UPDATEVALUE, issue_update.postedBy as POSTED FROM `issue_update` where id = '$id'" ;
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$arr = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$arr[] = $row;	
	}
}

# JSON-encode the response
echo $json_response = json_encode($arr);*/
?>