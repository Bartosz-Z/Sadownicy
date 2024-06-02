var slider1 = document.getElementById("enemy_intelligence");
var output1 = document.getElementById("EI");
output1.innerHTML = slider1.value;
slider1.oninput = function() {
  output1.innerHTML = this.value;
}

var slider2 = document.getElementById("sight_range");
var output2 = document.getElementById("SR");
output2.innerHTML = slider2.value;
slider2.oninput = function() {
  output2.innerHTML = this.value;
}

if (!localStorage.hasOwnProperty("players_num"))
	localStorage.setItem("players_num", "0");
if (!localStorage.hasOwnProperty("player_now"))
	localStorage.setItem("player_now", "1");

function SR_changed (obj)
{
	document.getElementById("SR").innerHTML = obj.value;
}

function EI_changed (obj)
{
	document.getElementById("EI").innerHTML = obj.value;
}

function Save ()
{
	//MAP
	localStorage.setItem("trees", document.getElementById("trees").value);
	localStorage.setItem("points", document.getElementById("points").value);
	localStorage.setItem("fog_of_war", document.getElementById("fog_of_war").checked);
	localStorage.setItem("tileset", document.getElementById("tileset").value);
	
	//ENEMIES
	localStorage.setItem("enemies", document.getElementById("enemies").value);
	localStorage.setItem("enemy_intelligence", document.getElementById("enemy_intelligence").value);
	localStorage.setItem("enemy_speed", document.getElementById("enemy_speed").value);
	
	//PLAYER
	localStorage.setItem("sight_range", document.getElementById("sight_range").value);
	localStorage.setItem("flashLightMode", document.getElementById("flashLightMode").checked);
}

function Load ()
{
	if (!localStorage.hasOwnProperty("trees"))
		return;
	
	//MAP
	document.getElementById("trees").value = localStorage.getItem("trees");
	document.getElementById("points").value = localStorage.getItem("points");
	document.getElementById("fog_of_war").checked = (localStorage.getItem("fog_of_war") == "false" ? false : true);
	document.getElementById("tileset").value = localStorage.getItem("tileset");
	
	//ENEMIES
	document.getElementById("enemies").value = localStorage.getItem("enemies");
	document.getElementById("enemy_intelligence").value = localStorage.getItem("enemy_intelligence");
	document.getElementById("enemy_speed").value = localStorage.getItem("enemy_speed");
	
	//PLAYER
	document.getElementById("sight_range").value = localStorage.getItem("sight_range");
	document.getElementById("flashLightMode").checked = (localStorage.getItem("flashLightMode") == "false" ? false : true);
}

Load();

function Play ()
{
	localStorage.setItem("players", "1");
	localStorage.player_now = "1";
	window.location = "game.html";
}

function UpdateScoreboard ()
{
	var table = document.getElementById("scoreboard");
	var players_num = Number(localStorage.players_num);
	
	var rowCount = table.rows.length;
	for (var i = 0; i < rowCount; i++) {
		table.deleteRow(0);
	}
	
	var top_raw = table.insertRow(0);
	var top_cell = document.createElement('th');
	top_cell.setAttribute("colspan", 3);
	top_cell.innerHTML = "Tablica wyników";
	top_cell.style.borderBottom = "3px solid white";
	top_raw.appendChild(top_cell);
	
	var top_raw_2 = table.insertRow(1);
	var top_cell_1 = document.createElement('th');
	var top_cell_2 = document.createElement('th');
	var top_cell_3 = document.createElement('th');
	
	top_cell_1.innerHTML = "Gracz";
	top_cell_1.style.borderBottom = "2px solid white";
	top_cell_1.style.borderRight = "2px solid white";
	top_raw_2.appendChild(top_cell_1);
	
	top_cell_2.innerHTML = "Wynik";
	top_cell_2.style.borderBottom = "2px solid white";
	top_cell_2.style.borderRight = "2px solid white";
	top_raw_2.appendChild(top_cell_2);
	
	top_cell_3.innerHTML = "Procent punktów";
	top_cell_3.style.borderBottom = "2px solid white";
	top_raw_2.appendChild(top_cell_3);
	
	for (var i=0; i < players_num; i++)
	{
		var raw = table.insertRow(i+2);
		var cell_1 = document.createElement('th');
		var cell_2 = document.createElement('th');
		var cell_3 = document.createElement('th');
		
		cell_1.innerHTML = localStorage.getItem("player_" + (i+1));
		cell_1.style.borderBottom = "1px solid white";
		cell_1.style.borderRight = "1px solid white";
		cell_2.innerHTML = localStorage.getItem("player_points_" + (i+1)) + "/" + localStorage.getItem("player_max_points_" + (i+1));
		cell_2.style.borderBottom = "1px solid white";
		cell_2.style.borderRight = "1px solid white";
		if(Number(localStorage.getItem("player_max_points_" + (i+1))) == 0){
			cell_3.innerHTML = "0%";
		}
		else{
			cell_3.innerHTML = (Number(localStorage.getItem("player_points_" + (i+1))) / Number(localStorage.getItem("player_max_points_" + (i+1)))) * 100.0 + "%";
		}
		cell_3.style.borderBottom = "1px solid white";
		
		raw.appendChild(cell_1);
		raw.appendChild(cell_2);
		raw.appendChild(cell_3);
	}
}

UpdateScoreboard();

function NewPlayer ()
{
	var player = prompt("Nick nowego gracza:", "");
	if (player != null)
	{
		if (player.length < 1)
			return;
		
		localStorage.players_num = Number(localStorage.players_num) + 1;
		localStorage.setItem("player_" + localStorage.players_num, player);
		localStorage.setItem("player_points_" + localStorage.players_num, 0);
		localStorage.setItem("player_max_points_" + localStorage.players_num, 0);
		
		UpdateScoreboard();
	}
}

function Reset ()
{
	for (var i=1; i <= 100; i++)
	{
		if (localStorage.hasOwnProperty("player_" + i))
			localStorage.removeItem("player_" + i);
		if (localStorage.hasOwnProperty("player_points_" + i))
			localStorage.removeItem("player_points_" + i);
		if (localStorage.hasOwnProperty("player_max_points_" + i))
			localStorage.removeItem("player_max_points_" + i);
		localStorage.setItem("players_num", "0");
		localStorage.setItem("player_now", "1");
	}
	
	UpdateScoreboard();
}

function Play_multiplayer ()
{
	localStorage.setItem("players", "2");
	window.location = "game_multiplayer.html";
}

function Play_editor ()
{
	window.location = "editor.html";
}

function Play_editor_map (file_name)
{
	window.location = "game_editor.php?f=" + file_name;
}