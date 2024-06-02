function map_save() {
	var map_string = "s=" + MapSize + "&x=" + Map.length + "&y=" + Map[0].length + "&";
	var map_of_MOs = {};
	for (var i=0; i < Map.length; i++) {
		for (var j=0; j < Map[i].length; j++) {
			if (map_of_MOs[Map[i][j][1].name]  === undefined) {
				map_of_MOs[Map[i][j][1].name] = Object.keys(map_of_MOs).length;
			}
		}
	}
	
	var keys = Object.keys(map_of_MOs);
	
	for (var i=0; i < keys.length; i++) {
		map_string += keys[i] + "=" + map_of_MOs[keys[i]] + "&";
	}
	
	map_string += "map=";
	
	for (var i=0; i < Map.length; i++) {
		for (var j=0; j < Map[i].length; j++) {
			map_string += map_of_MOs[Map[i][j][1].name];
		}
	}
	
	document.getElementById("save-submit").value = map_string;
}

function map_load() {
	var map_name = prompt("Please type map name.", "0000.txt");
	map_load_data(map_name);
}

function map_load_data(file_name) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = this.response.split("&");
			
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			
			MapSize = Number(response[0].split("=")[1]);
			
			size_x = Number(response[1].split("=")[1]);
			size_y = Number(response[2].split("=")[1]);
			
			var new_map = response[response.length-1].split("=")[1];
			
			var MOs_info = new Array(response.length-4);
			
			for (var i=3; i < response.length-1; i++) {
				MOs_info[i-3] = response[i].split("=");
			}
			
			Map = new Array(size_x);
			for (var i=0; i < Map.length; i++) {
				Map[i] = new Array(size_y);
				for (var j=0; j < Map[i].length; j++) {
					Map[i][j] = new Array(2);
					Map[i][j][0] = current_tileset.getTile("grass");
					Map[i][j][1] = current_tileset.getTile(MOs_info[Number(new_map.charAt(i*Map[i].length+j))][0]);
				}
			}
			
			canvas_x_offset = (canvas.width - Map.length * MapSize) / 2;
			canvas_y_offset = (canvas.height - Map[0].length * MapSize) / 2;
			
			updateMap();
		}
	};
	xhttp.open("GET", "map_load.php?f="+file_name, true);
	xhttp.send();
}