<?php
	header('Content-type: text/javascript');
	include 'Classes.php';

	$explorer = new Explorer("0");
	echo json_encode($explorer, JSON_PRETTY_PRINT);
