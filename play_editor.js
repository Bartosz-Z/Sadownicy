var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var MapSize;
var size_x;
var size_y;
var edge = 5;
var canvas_x_offset, canvas_y_offset;

var Map, Vision;

var points_left = 0;

var stop_game = false;
var tileset_target = new Tileset(tilesets[tileset_id]);

function RandomRange (min,max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function SymRound (a)
{
	var temp = a - Math.floor(a);
	if (a < 0 && temp.toFixed(2) == "0.50")
		return Math.round(a) - 1;
	else
		return Math.round(a);
}

class Color
{
	ToString()
	{
		return "#" + 
		(this.r.toString(16).length == 1 ? "0" + this.r.toString(16) : this.r.toString(16)) +
		(this.g.toString(16).length == 1 ? "0" + this.g.toString(16) : this.g.toString(16)) +
		(this.b.toString(16).length == 1 ? "0" + this.b.toString(16) : this.b.toString(16));
	}
	
	Random()
	{
		this.r = RandomRange(0,255);
		this.g = RandomRange(0,255);
		this.b = RandomRange(0,255);
		
		return this;
	}
	
	constructor(R,G,B)
	{
		this.r = Math.round(R);
		this.g = Math.round(G);
		this.b = Math.round(B);
	}
}

function FillPos (x,y,color,offset=1) {
	ctx.fillStyle = color;
	ctx.fillRect(x + offset + canvas_x_offset, y + offset + canvas_y_offset, MapSize - offset * 2, MapSize - offset * 2);
}

function UpdateVision () {
	for (var i=edge; i < Vision.length-edge; i++)
		for (var j=edge; j < Vision[i].length-edge; j++)
		{			
			if (Vision[i][j])
			{
				FillPos(i * MapSize, j * MapSize, Map[i][j][0].tile.color, Map[i][j][0].tile.offset);
				if (Map[i][j][1].name != "none")
					FillPos(i * MapSize, j * MapSize, Map[i][j][1].tile.color, Map[i][j][1].tile.offset);
			}
			else
				FillPos(i * MapSize, j * MapSize, "black", 0);
		}
}

var start_x = [0], start_y = [0];

function setMap() {
	MapSize = Number(map_string[0].split("=")[1]);
	size_x = Number(map_string[1].split("=")[1]);
	size_y = Number(map_string[2].split("=")[1]);
	
	var new_map = map_string[map_string.length-1].split("=")[1];
	var MOs_info = new Array(map_string.length-4);
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
			
	for (var i=3; i < map_string.length-1; i++) {
		MOs_info[i-3] = map_string[i].split("=");
	}
	
	var starting_positions_of_player = [];

	Map = new Array(size_x + edge * 2);
	for (var i=0; i < Map.length; i++) {
		Map[i] = new Array(size_y + edge * 2);
		for (var j=0; j < Map[i].length; j++) {
			Map[i][j] = new Array(2);
			Map[i][j][0] = tileset_target.getTile("grass");
			
			if (i < edge || i + edge > Map.length || j < edge || j + edge > Map[i].length)
				Map[i][j][1] = tileset_target.getTile("none");
			else
				Map[i][j][1] = tileset_target.getTile(MOs_info[Number(new_map.charAt((i-edge)*(Map[i].length-edge*2)+(j-edge)))][0]);
			
			if (Map[i][j][1].name == "player") {
				Map[i][j][1] = tileset_target.getTile("none");
				starting_positions_of_player.push({x:i, y:j});
			}
			
			if (Map[i][j][1].name == "point")
				points_left++;
		}
	}
	
	var random_starting_position_of_player = RandomRange(0, starting_positions_of_player.length);
	start_x[0] = starting_positions_of_player[random_starting_position_of_player].x;
	start_y[0] = starting_positions_of_player[random_starting_position_of_player].y;
	
	canvas_x_offset = (canvas.width - Map.length * MapSize) / 2;
	canvas_y_offset = (canvas.height - Map[0].length * MapSize) / 2;
	
	Vision = new Array(Map.length);
	for (var i=0; i < Vision.length; i++) {
		Vision[i] = new Array(Map[0].length);
		for (var j=0; j < Vision[i].length; j++)
			Vision[i][j] = !fog_of_war;
	}
}

function UpdatePoints ()
{
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 300, 60);
	ctx.fillStyle  = "white";
	ctx.font = "30px Arial";
	ctx.fillText("Points: " + players[0].points + "/" + points_left, 10, 30);
	
	if (players.length < 2)
		return;
	
	ctx.fillStyle = "black";
	ctx.fillRect(canvas.width - 300, 0, 300, 60);
	ctx.fillStyle  = "white";
	ctx.font = "30px Arial";
	ctx.textAlign = "right";
	ctx.fillText("Points: " + players[1].points + "/" + points_left, canvas.width - 10, 30);
}

var end_of_the_game = false;

function Initialization () {
	end_of_the_game = false;
	alert("Teraz będzie grał:\n" + localStorage.getItem("player_" + localStorage.player_now));
	points_left = 0;
	setMap();
}

Initialization();

function KillPlayer (x,y)
{
	for (var i=0; i < players.length; i++)
	{
		if (!players[i].alive)
			continue;
		if (players[i].x == x && players[i].y == y)
		{
			players[i].Kill();
			break;
		}
	}
	
	if (players_left <= 0)
		EndGame();
}

function EndGame ()
{
	end_of_the_game = true;
	temp_fog_of_war = fog_of_war;
	fog_of_war = false;
	UpdateVision();
	
	alert("Przegryw!");
	
	localStorage.setItem("player_max_points_" + localStorage.player_now, Number(localStorage.getItem("player_max_points_" + localStorage.player_now)) + points_left);
	localStorage.setItem("player_points_" + localStorage.player_now, Number(localStorage.getItem("player_points_" + localStorage.player_now)) + players[0].points);
	
	if (Number(localStorage.player_now) == Number(localStorage.players_num)) {
		window.location = "menu.php";
		localStorage.player_now = "1";
		return;
	} else
		localStorage.player_now = Number(localStorage.player_now) + 1;
	
	fog_of_war = temp_fog_of_war;
	Initialization();
	SetEnemies();
	players[0] = new player("player", tileset_target.player, start_x[0], start_y[0], 1);
	UpdatePoints();
}