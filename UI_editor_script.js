function loadTilesetToUI (UItileset) {
	document.getElementById("icon-button-grass").style.backgroundColor = UItileset.grass.color;
	document.getElementById("icon-button-wall").style.backgroundColor = UItileset.wall.color;
	document.getElementById("icon-button-edge").style.backgroundColor = UItileset.edge.color;
	document.getElementById("icon-button-player").style.backgroundColor = UItileset.player.color;
	document.getElementById("icon-button-enemy").style.backgroundColor = UItileset.enemy.color;
	document.getElementById("icon-button-point").style.backgroundColor = UItileset.point.color;
	document.getElementById("icon-insert-element").style.backgroundColor = UItileset.none.color;
}

//setting default tileset
var current_tileset = new Tileset(tileset_orchard);
//Loading default tileset into user-interface
loadTilesetToUI(current_tileset);

function dropdown_hover_in (element) {
	element.style.top = element.getElementsByTagName("table")[0].offsetHeight + "px";
}

function dropdown_hover_out (element) {
	element.style.top = "0px";
}

function set_insert_object (propName) {
	insert_object_name = propName;
	document.getElementById("icon-insert-element").style.backgroundColor = current_tileset[propName].color;
}

function set_insert_object_none() {
	insert_object_name = "";
	document.getElementById("icon-insert-element").style.backgroundColor = "white";
}

function back() {
	if (confirm("Are you sure?\nThere is no auto-save feature!")) {
		window.location = "menu.php";
	}
}

function clear_map() {
	if (confirm("Are you sure you want to clear whole map?")) {
		for (var i=0; i < Map.length; i++) {
			for (var j=0; j < Map[i].length; j++) {
				Map[i][j][0] = current_tileset.getTile("grass");
				
				if (i == 0 || i == Map.length - 1 || j == 0 || j == Map[0].length - 1)
					Map[i][j][1] = current_tileset.getTile("edge");
				else
					Map[i][j][1] = current_tileset.getTile("none");
			}
		}
		
		updateMap();
	}
}