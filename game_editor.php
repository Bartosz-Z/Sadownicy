<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" href="styles.css">
	</head>

	<body id="game">
		<canvas id="myCanvas" style='position:absolute; left:0px; top:0px;' ontouchstart="myFunction(event)" ontouchmove="myFunction2(event)"  ontouchend="endt()">
			Your browser does not support the canvas element.
		</canvas>

		<?php
			$file_name = "maps/".$_GET["f"];
			$file = fopen($file_name, "r") or die("Unable to open file!");
			echo "
				<script>
					var map_string = '".fgets($file)."';
					map_string = map_string.split('&');
				</script>
			";
			fclose($file);
		?>
		<script src="tilesets.js"></script> 
		<script src="data.js"></script>
		<script src="play_editor.js"></script> 
		<script src="player.js"></script> 
		<script src="enemy.js"></script> 
		<script src="Bomb.js"></script> 
		<script src="weapon.js"></script> 
	</body>
</html>

