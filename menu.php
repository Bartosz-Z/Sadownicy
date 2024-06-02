<!DOCTYPE html>
<html>

<head>
	<title>MENU</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="menu_css.css">
	<link href="https://fonts.googleapis.com/css?family=Cousine" rel="stylesheet">
</head>

<body>
	<center>
		<table id="asdf">
			<tr>
				<th colspan="3" class="title">
					MENU
				</th>
			</tr>
			
			<tr>
				<th class="abc" style="width:33%;">
					MAPA
					<table>
						<tr>
							<td class="left">
								Drzewa:
							</td>
							<td class="right">
								<input id="trees" type="number" value="5" min="1" />
							</td>
						</tr>
						
						<tr>
							<td class="left">
								Punkty:
							</td>
							<td class="right">
								<input id="points" type="number" value="10" min="1" />
							</td>
						</tr>
						
						<tr>
							<td class="left">
								Zakryta mapa:
							</td>
							<td class="right">
								<input id="fog_of_war" type="checkbox" />
							</td>
						</tr>
						
						<tr>
							<td class="left">
								Sceneria:
							</td>
							<td class="right">
								<select id="tileset" style="width:100%;">
									<option value="0">Sad</option>
									<option value="1">Jaskinia</option>
									<option value="2">Na morza dnie</option>
									<option value="3">Bagno</option>
									<option value="4">Pole rzepy</option>
									<option value="5">Wietnam</option>
									<option value="6">Watykan</option>
									<option value="7">Śląsk</option>
									<option value="8">Wygeneruj losowo</option>
									<option value="-1">Wybierz losową opcję</option>
							  </select>
							</td>
						</tr>
					</table>
				</th>

				<th class="abc" style="width:33%;">
					<table>
						PRZECIWNICY
						<tr>
							<td class="left">
								Przeciwnicy:
							</td>
							<td class="right">
								<input id="enemies" type="number" value="20" min="1" />
							</td>
						</tr>
						
						<tr>
							<td class="left">
								Inteligencja:
							</td>
							<td class="right">
								<input id="enemy_intelligence" type="range" min="1" max="15" value="6" onchange="EI_changed(this)" class="slider"/>
							</td>
							<td id="EI">
								6
							</td>
						</tr>
						
						<tr>
							<td class="left">
								Szybkość:
							</td>
							<td class="right">
								<input id="enemy_speed" type="number" value="400" min="1" />
							</td>
						</tr>
					</table>
				</th>
			
				<th style="width:33%;">
					<table>
						GRACZ
						<tr>
							<td class="left">
								Pole widzenia:
							</td>
							<td class="right">
								<input id="sight_range" type="range" min="-1" max="6" value="6" onchange="SR_changed(this)" class="slider"/>
							</td>
							<td id="SR">
								6
							</td>
						</tr>
						
						<tr>
							<td class="left">
								Tryb latarki:
							</td>
							<td class="right">
								<input id="flashLightMode" type="checkbox" />
							</td>
						</tr>
					</table>
				</th>
		</table>
		
		<table id="buttons">
			<tr>
				<th class="buttons2">
					<input type="button" value="Zapisz" onclick="Save()" class="thebutton"/>
				</th>
				
				<th class="buttons2">
					<input type="button" value="Graj" onclick="Play()" class="thebutton"/>
				</th>
				
				<th class="buttons2">
					<input type="button" value="Nowy gracz" onclick="NewPlayer()" class="thebutton"/>
				</th>
				
				<th class="buttons2">
					<input type="button" value="Zresetuj graczy" onclick="Reset()" class="thebutton"/>
				</th>
			</tr>
			<tr>
				<th colspan="4" class="buttons2">
					<input type="button" value="Graj w grę wieloosobową" id="button_multi" onclick="Play_multiplayer()" class="thebutton"/>
				</th>
			</tr>
			<tr>
				<th colspan="4" class="buttons2">
					<input type="button" value="Edytor map" id="button_editor" onclick="Play_editor()" class="thebutton"/>
				</th>
			</tr>
		</table>
		
		<?php
		
			$folder = "maps/";
	
			$files = glob($folder."*.txt");
			if ($files){
				echo "<table class='editor-maps'>";
				foreach ($files as $map_file_name)
				{
					$file_name = substr(stristr($map_file_name, "/"), 1);
					echo "
						<tr class='editor-map-row'>
							<td>
								File name: $file_name
							</td>
							<td>
								<button class='thebutton' onclick=\"Play_editor_map('$file_name')\">
									Play
								</button>
							</td>
						</tr>
					";
				}
				echo "</table>";
			}
		
		?>
		
		<table id="scoreboard">
		</table>
	</center>
	<script src="menu_js.js"></script> 
</body>
</html>