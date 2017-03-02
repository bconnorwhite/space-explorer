<?php

	function getRow($keys, $ids, $table){//Returns the first row in '$table' where each column '$keys' matches '$ids'
		$result = getResult($keys, $ids, $table);
		if(mysqli_num_rows($result) > 0){
			$row = mysqli_fetch_assoc($result);
			mysqli_free_result($result);
			return $row;
		}
		return null;

	}

	function getRows($keys, $ids, $table){//Return all rows in '$table' where each column '$keys' matches '$ids'
		$result = getResult($keys, $ids, $table);
		$rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
		mysqli_free_result($result);
		return $rows;
	}

	function getResult($keys, $ids, $table){
		$database = "SpaceExplorer";
		$servername = "localhost";
		$username = "root";
		$password = "";

		$conn = new mysqli($servername, $username, $password, $database);
		if($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}
		$conn->set_charset('utf8mb4');

		$sql = "SELECT * FROM $table WHERE ";
		if(is_array($keys) && is_array($ids)){//Allows for lists of keys and ids that must match
			for($i = 0; $i<count($keys) && $i<count($ids); $i++){
				$sql = $sql . "$keys[$i] = $ids[$i]";
				if(($i + 1) < count($keys)){
					$sql = $sql . " AND ";
				}
			}
		} else {//If keys and ids are variables instead of arrays
			$sql = $sql . "$keys = $ids";
		}

		$result = mysqli_query($conn, $sql);
		mysqli_close($conn);

		return $result;
	}
