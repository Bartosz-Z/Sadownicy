function MapTile (color, offset = 1, transparent = false) {
	if (color instanceof MapTile)
	{
		this.color = color.color;
		this.offset = color.offset;
		this.transparent = color.transparent;
	}
	else
	{
		this.color = color;
		this.offset = offset;
		this.transparent = transparent;
	}
}

function Tileset (grass, edge, wall, enemy, point, player) {
	if (grass instanceof Tileset)
	{
		this.grass = new MapTile(grass.grass);
		this.edge = new MapTile(grass.edge);
		this.wall = new MapTile(grass.wall);
		this.enemy = new MapTile(grass.enemy);
		this.point = new MapTile(grass.point);
		this.player = new MapTile(grass.player);
		this.none = new MapTile(grass.none);
	}
	else
	{
		this.grass = new MapTile(grass, 1, true);
		this.edge = new MapTile(edge);
		this.wall = new MapTile(wall);
		this.enemy = new MapTile(enemy, 1, true);
		this.point = new MapTile(point, 3, true);
		this.player = new MapTile(player, 1, true);
		this.none = new MapTile("#ffffff", 0, true);
	}
	
	this.getTile = function (tile_name) {
		if (this[tile_name] === undefined)
			return null;
		
		return {name : tile_name, tile : new MapTile(this[tile_name])};
	}
}

function get_rand_color()
{
    var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
    while(color.length < 6) {
        color = "0" + color;
    }
    return "#" + color;
}

const tilesets = [
	new Tileset("green", "brown", "brown", "red", "#9933ff", "yellow"),
	new Tileset("#c0c0c0", "#585858", "#585858", "red", "#666633", "yellow"),
	new Tileset("#00ffff", "#003399", "#003399", "red", "#336600", "yellow"),
	new Tileset("#606000", "brown", "brown", "#009933", "#ffff66", "gray"),
	new Tileset("#d2a679", "#84898a", "#84898a", "#ff3300", "#fff2cc", "#0066ff"),
	new Tileset("#5dd55d", "#008000", "#008000", "#018101", "#ffff1a", "#3c3c6e"),
	new Tileset("#f0f0f0", "#ffffff", "#ca5735", "#f2be8c", "#e0d3b0", "#4da6ff"),
	new Tileset("#646768", "#414249", "#414249", "#ffe200", "#000000", "#bc720e"),
	new Tileset(get_rand_color(),get_rand_color(),get_rand_color(),get_rand_color(),get_rand_color(),get_rand_color())
];

const tileset_orchard = new Tileset("green", "brown", "brown", "red", "#9933ff", "yellow");
const tileset_cave = new Tileset("#c0c0c0", "#585858", "#585858", "red", "#666633", "yellow");
const tileset_under_the_sea = new Tileset("#00ffff", "#003399", "#003399", "red", "#336600", "yellow");
const tileset_swamp = new Tileset("#606000", "brown", "brown", "#009933", "#ffff66", "gray");
const tileset_turlip_field = new Tileset("#d2a679", "#84898a", "#84898a", "#ff3300", "#fff2cc", "#0066ff");
const tileset_vietnam = new Tileset("#5dd55d", "#008000", "#008000", "#018101", "#ffff1a", "#3c3c6e");
const tileset_vatican = new Tileset("#f0f0f0", "#ffffff", "#ca5735", "#f2be8c", "#e0d3b0", "#4da6ff");
const tileset_silesia = new Tileset("#646768", "#414249", "#414249", "#ffe200", "#000000", "#bc720e");
const tileset_totaly_random = new Tileset(get_rand_color(),get_rand_color(),get_rand_color(),get_rand_color(),get_rand_color(),get_rand_color());