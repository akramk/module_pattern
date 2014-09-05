<?php 
require_once '../includes/db.php'; // The mysql database connection script
$status = '%';

if(isset($_GET['id'])){
$id = $_GET['id'];
}

session_start();
$user = $_SESSION['user'];

//$query="select NAME, DESCRIPTION from issue where createdBy like '$user' ";
$query = "SELECT id as ID, username as USERNAME, assigned as ASSIGNED FROM `issue_persmission` WHERE id IN (SELECT id from `issue_persmission` WHERE username ='$user')" ;
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
$arr = array();

$res = array();

if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
        if(!array_key_exists($row["ID"], $res)){
        $res[$row["ID"]] = array();
        }
        if(!array_key_exists($row["USERNAME"], $res[$row["ID"]])){
        $res[$row["ID"]][$row["USERNAME"]] = $row["ASSIGNED"];

        }
		$arr[] = $row;
	}
}




# JSON-encode the response
echo $json_response = json_encode($res);
?>