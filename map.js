/*var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var MapSize = 20;
var edge = 5;

var Map, Vision;

var points_left = 0;

var stop_game = false;
var tileset_target = tilesets[tileset_id];;

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

class MO
{
	constructor(name = "none", color = "none", transparent = false, offset = 1)
	{
		this.name = name;
		this.color = color;
		this.transparent = transparent;
		this.offset = offset;
	}
}

function FillPos (x,y,color,offset=1) {
	ctx.fillStyle = color;
	ctx.fillRect(x - x % MapSize+offset, y - y % MapSize+offset, MapSize-offset*2, MapSize-offset*2);
}

function UpdateVision () {
	for (var i=edge; i < Vision.length-edge; i++)
		for (var j=edge; j < Vision[i].length-edge; j++)
		{			
			if (Vision[i][j])
			{
				FillPos(i * MapSize, j * MapSize, Map[i][j][0].color, Map[i][j][0].offset);
				FillPos(i * MapSize, j * MapSize, Map[i][j][1].color, Map[i][j][1].offset);
			}
			else
				FillPos(i * MapSize, j * MapSize, "black", 0);
		}
}

var start_x = [0], start_y = [0];
var tileset_target;

function setMap() {
    canvas.width = window.innerWidth - window.innerWidth % MapSize;
    canvas.height = window.innerHeight - window.innerHeight % MapSize;
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	start_x[0] = RandomRange(edge + 1, canvas.width / MapSize - edge - 2);
	start_y[0] = RandomRange(edge + 1, canvas.height / MapSize - edge - 2);
		
	Map = new Array(canvas.width / MapSize);
	for (var i=0; i < Map.length; i++) {
		Map[i] = new Array(canvas.height / MapSize);
		for (var j=0; j < Map[i].length; j++) {
			Map[i][j] =  new Array(2);
			Map[i][j][0] = new MO("grass", tileset_target.grass);
			Map[i][j][1] = new MO();
			
			if (i == edge || i == Map.length - edge - 1 || j == edge || j == Map[0].length - edge - 1)
				Map[i][j][1] = new MO("edge", tileset_target.edge);
			
			if (i <= edge || i >= Map.length - edge - 1 || j <= edge || j >= Map[0].length - edge - 1)
				continue;
			
			var ok = true;
			
			for (var s=0; s < start_x.length && s < start_y.length; s++)
			{
				if(Math.abs(i - start_x[s]) <= 3 && Math.abs(j - start_y[s]) <= 3)
				{
					ok = false;
					break;
				}
			}
			
			if (!ok)
				continue;
			
			if (RandomRange(0,number_of_points) == 0)
			{
				Map[i][j][1] = new MO("point", tileset_target.point, true, 3);
				points_left++;
			}
			
			if (RandomRange(0,number_of_trees) == 0)
			{
				if (Map[i][j][1].name == "point")
					points_left--;
					
				Map[i][j][1] = new MO("tree", tileset_target.wall);
			}
		}
	}
	
	Vision = new Array(canvas.width / MapSize);
	for (var i=0; i < Vision.length; i++) {
		Vision[i] = new Array(canvas.height / MapSize);
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
	alert("Teraz bÄ?dzie graÅ?:\n" + localStorage.getItem("player_" + localStorage.player_now));
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
		window.location = "menu.html";
		localStorage.player_now = "1";
		return;
	} else
		localStorage.player_now = Number(localStorage.player_now) + 1;
	
	fog_of_war = temp_fog_of_war;
	Initialization();
	SetEnemies();
	players[0] = new player("player", tileset_target.player, start_x[0], start_y[0], 1);
	UpdatePoints();
}*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var MapSize = 20;
var edge = 5;

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
	ctx.fillRect(x - x % MapSize+offset, y - y % MapSize+offset, MapSize-offset*2, MapSize-offset*2);
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
    canvas.width = window.innerWidth - window.innerWidth % MapSize;
    canvas.height = window.innerHeight - window.innerHeight % MapSize;
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	start_x[0] = RandomRange(edge + 1, canvas.width / MapSize - edge - 2);
	start_y[0] = RandomRange(edge + 1, canvas.height / MapSize - edge - 2);
		
	Map = new Array(canvas.width / MapSize);
	for (var i=0; i < Map.length; i++) {
		Map[i] = new Array(canvas.height / MapSize);
		for (var j=0; j < Map[i].length; j++) {
			Map[i][j] =  new Array(2);
			Map[i][j][0] = tileset_target.getTile("grass");
			Map[i][j][1] = tileset_target.getTile("none");
			
			if (i == edge || i == Map.length - edge - 1 || j == edge || j == Map[0].length - edge - 1)
				Map[i][j][1] = tileset_target.getTile("edge");
			
			if (i <= edge || i >= Map.length - edge - 1 || j <= edge || j >= Map[0].length - edge - 1)
				continue;
			
			var ok = true;
			
			for (var s=0; s < start_x.length && s < start_y.length; s++)
			{
				if(Math.abs(i - start_x[s]) <= 3 && Math.abs(j - start_y[s]) <= 3)
				{
					ok = false;
					break;
				}
			}
			
			if (!ok)
				continue;
			
			if (RandomRange(0,number_of_points) == 0)
			{
				Map[i][j][1] = tileset_target.getTile("point");
				points_left++;
			}
			
			if (RandomRange(0,number_of_trees) == 0)
			{
				if (Map[i][j][1].name == "point")
					points_left--;
					
				Map[i][j][1] = tileset_target.getTile("wall");
			}
		}
	}
	
	Vision = new Array(canvas.width / MapSize);
	for (var i=0; i < Vision.length; i++) {
		Vision[i] = new Array(canvas.height / MapSize);
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
	alert("Teraz bÄ™dzie graÅ‚:\n" + localStorage.getItem("player_" + localStorage.player_now));
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