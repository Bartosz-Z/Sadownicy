<?php
	$file_name = "maps/".$_GET["f"];
	
	$file = fopen($file_name, "r") or die("Unable to open file!");
	
	echo fgets($file);
	fclose($file);
?>