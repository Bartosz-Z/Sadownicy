var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var MapSize;
var size_x;
var size_y;
var Map;
var canvas_x_offset, canvas_y_offset;

var insert_object_name;

var continuous_click = false;

while (MapSize == null || MapSize == "" || isNaN(MapSize)) {
	MapSize = Number(prompt("Please enter tile map size.", "20"));
}

while (size_x == null || size_x == "" || isNaN(size_x) || window.innerWidth  <= (size_x + 10) * MapSize) {
	size_x = Number(prompt("Please enter map width (less then " + Math.floor(window.innerWidth / MapSize - 10) + ").", ""));
}

while (size_y == null || size_y == "" || isNaN(size_y) || window.innerHeight  <= (size_y + 10) * MapSize) {
	size_y = Number(prompt("Please enter map height (less then " + Math.floor(window.innerHeight /  MapSize - 10) + ").",  ""));
}


function clone(obj) {
	if (null == obj) return obj;
	var copy = new obj.constructor();
	
	for (var attr in obj) {
		if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	}
	
	return copy;
}

function RandomRange (min,max) {
	return Math.floor(Math.random() * (max - min)) + min;
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
	ctx.fillRect(x + offset, y + offset, MapSize - offset * 2, MapSize - offset * 2);
}

function updateMap() {
	for (var i=0; i < Map.length; i++) {
		for (var j=0; j < Map[i].length; j++) {		
			FillPos(i * MapSize + canvas_x_offset, j * MapSize + canvas_y_offset, Map[i][j][0].tile.color, Map[i][j][0].tile.offset);
			if (Map[i][j][1].name != "none")
				FillPos(i * MapSize + canvas_x_offset, j * MapSize + canvas_y_offset, Map[i][j][1].tile.color, Map[i][j][1].tile.offset);
		}
	}
}

function setMap() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
		
	Map = new Array(size_x);
	for (var i=0; i < Map.length; i++) {
		Map[i] = new Array(size_y);
		for (var j=0; j < Map[i].length; j++) {
			Map[i][j] =  new Array(2);
			Map[i][j][0] = current_tileset.getTile("grass");
			Map[i][j][1] = current_tileset.getTile("none");
			
			if (i == 0 || i == Map.length - 1 || j == 0 || j == Map[0].length - 1)
				Map[i][j][1] = current_tileset.getTile("edge");
		}
	}
	
	canvas_x_offset = (canvas.width - Map.length * MapSize) / 2;
	canvas_y_offset = (canvas.height - Map[0].length * MapSize) / 2;
	
	updateMap();
}

setMap();

function start_continuous_click(event) {
	continuous_click = true;
	insert_element(event);
}

function insert_element(event) {
	if (!continuous_click)
		return;
	
	if (insert_object_name == null || insert_object_name == "")
		return;
	
	if (event.clientX <= canvas_x_offset || event.clientY <= canvas_y_offset || event.clientX >= Map.length * MapSize + canvas_x_offset || event.clientY >= Map[0].length * MapSize + canvas_y_offset)
		return;
	
	var x = (event.clientX - canvas_x_offset) - (event.clientX - canvas_x_offset) % MapSize + canvas_x_offset;
	var y = (event.clientY - canvas_y_offset) - (event.clientY - canvas_y_offset) % MapSize + canvas_y_offset;
	
	var map_x = (x - canvas_x_offset) / MapSize;
	var map_y = (y - canvas_y_offset) / MapSize;
	
	//var mapObject = new MO(insert_object_name, current_tileset[insert_object_name], insert_object_name == "enemy" || insert_object_name == "point", insert_object_name == "point" ? 3 : 1);
	var mapObject = current_tileset.getTile(insert_object_name);
	
	FillPos(x, y, Map[map_x][map_y][0].tile.color);
	FillPos(x, y, mapObject.tile.color, mapObject.tile.offset);
	
	if (insert_object_name != "grass")
		Map[map_x][map_y][1] = mapObject;
	else 
		Map[map_x][map_y][1] = current_tileset.getTile("none");
}

function stop_continuous_click() {
	continuous_click = false;
}