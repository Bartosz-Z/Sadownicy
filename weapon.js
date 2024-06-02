class Weapon {
	
	Anim (x,y,offset,obj,stop)
	{		
		if (stop)
		{
			Map[x][y][1] = tileset_target.getTile("none");
			if (Vision[x][y])
				FillPos(x*MapSize,y*MapSize,Map[x][y][0].tile.color);
			return false;
		}

		if (Map[x][y][1].name == "player") {
			KillPlayer(x,y);
			return true;
		}
		
		if (Map[x][y][1].name == "enemy") {
			KillEnemy(x,y);
			return true;
		}
	
		if (Map[x][y][1].name != "none")
			return true;
		
		Map[x][y][1] = {name : "boom", tile: new MapTile("#aa0000", offset, true)};
		
		if (Vision[x][y]) {
			FillPos(x*MapSize,y*MapSize,Map[x][y][0].tile.color);
			FillPos(x*MapSize,y*MapSize,Map[x][y][1].tile.color,offset);
		}
		
		setTimeout(obj.Anim, shot_duration, x, y, offset, obj, true);
		return false;
	}
	
	Shot (range, dir, obj)
	{
		if (range > obj.range)
			return;
		
		range++;
		
		var x = obj.x;
		var y = obj.y;
		
		switch(dir)
		{
			case 0:
				y -= range;
			break;
			case 1:
				x += range;
			break;
			case 2:
				y += range;
			break;
			case 3:
				x -= range;
			break;
		}
		
		if (!obj.stop)
			obj.stop = obj.Anim(x, y, MapSize/4, obj, false);
		
		setTimeout(obj.Shot, shot_duration, range, dir, obj);
	}
	
	constructor(x,y,range,dir)
	{
		this.x = x;
		this.y = y;
		this.stop = false;
		this.range = range;
		this.Shot(0, dir, this);
	}
}