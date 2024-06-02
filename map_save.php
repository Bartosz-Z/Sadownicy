<?php
	$map = $_POST["map"];
	
	$folder = "maps/";
	
	$filecount = 0;
	$files = glob($folder."*.txt");
	if ($files){
		$filecount = count($files);
	}
	
	$file_name = (string)($filecount);
	
	while (strlen($file_name) < 4)
		$file_name = "0".$file_name;
	
	echo $folder.$file_name.".txt";
	
	$file = fopen($folder.$file_name.".txt", "w") or die("Unable to open file!");
	
	fwrite($file, $map);
	fclose($file);
?>