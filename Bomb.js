/*class Bomb {
	
	Anim (x,y,offset,color,grow,obj)
	{
		if (Map[x][y][1].name == "edge")
			return false;
		
		if (Map[x][y][1].name == "player")
			KillPlayer(x,y);
		
		if (Map[x][y][1].name == "enemy")
			KillEnemy(x,y);
		
		if (Map[x][y][1].name == "point") {
			points_left--;
			UpdatePoints();
		}

		if (grow && offset == 1)
			grow = false;
		
		if (grow) {
			color -= 10;
			//color.Random();
			offset--;
		} else {
			color += 10;
			//color.Random();
			offset++;
		}

		if (Map[x][y][1].name == "boom" && Math.abs(Map[x][y][1].offset - offset) != 1) {
			setTimeout(obj.Anim, bomb_animation_duration, x, y, offset, color, grow, obj);
			return true;
		}
		
		if (!grow && offset >= MapSize/2)
		{
			Map[x][y][1] = new MO();
			FillPos(x*MapSize,y*MapSize,Map[x][y][0].color);
			//UpdateVision();
			return true;
		}

		Map[x][y][1] = new MO("boom", color.ToString(), false, offset);
		if (Vision[x][y]) {
			FillPos(x*MapSize,y*MapSize,Map[x][y][0].color);
			FillPos(x*MapSize,y*MapSize,Map[x][y][1].color,offset);
		}
		setTimeout(obj.Anim, bomb_animation_duration, x, y, offset, color, grow, obj);
		return true;

		Map[x][y][1] = new MO("boom", "#" + color.toString(16) + "0000", false, offset);
		FillPos(x*MapSize,y*MapSize,Map[x][y][0].color);
		FillPos(x*MapSize,y*MapSize,Map[x][y][1].color,offset);
		//UpdateVision();
		setTimeout(obj.Anim, 50, x, y, offset, color, grow, obj);
		return true;
	}
	
	Boom (range, obj)
	{
		if (range > obj.range)
			return;
		
		range++;
		
		if (obj.right)
			obj.right = obj.Anim(obj.x + range, obj.y, MapSize/2, 271, true, obj);
		if (obj.left)
			obj.left = obj.Anim(obj.x - range, obj.y, MapSize/2, 271, true, obj);
		if (obj.bottom)
			obj.bottom = obj.Anim(obj.x, obj.y + range, MapSize/2, 271, true, obj);
		if (obj.top)
			obj.top = obj.Anim(obj.x, obj.y - range, MapSize/2, 271, true, obj);
		
		setTimeout(obj.Boom, bomb_duration, range, obj);
	}
	
	constructor(x,y,range,time)
	{
		this.x = x;
		this.y = y;
		this.top = true;
		this.bottom = true;
		this.right = true;
		this.left = true;
		this.range = range;
		setTimeout(this.Boom, time, 0, this);
	}
}*/

class Bomb {
	
	Anim (x,y,offset,color,grow,obj)
	{		
		if (Map[x][y][1].name == "edge")
			return false;
		
		if (Map[x][y][1].name == "player")
			KillPlayer(x,y);
		
		if (Map[x][y][1].name == "enemy")
			KillEnemy(x,y);
		
		if (Map[x][y][1].name == "point") {
			points_left--;
			UpdatePoints();
		}
		
		if (grow && offset == 1)
			grow = false;
		
		if (grow) {
			color.r -= 10;
			offset--;
		} else {
			color.r += 10;
			offset++;
		}
		
		if (Map[x][y][1].name == "boom" && Math.abs(Map[x][y][1].tile.offset - offset) != 1) {
			setTimeout(obj.Anim, bomb_animation_duration, x, y, offset, color, grow, obj);
			return true;
		}
		
		if (!grow && offset >= MapSize/2)
		{
			Map[x][y][1] = tileset_target.getTile("none");
			if (Vision[x][y])
				FillPos(x*MapSize,y*MapSize,Map[x][y][0].tile.color);
			return true;
		}

		Map[x][y][1] = {name : "boom", tile: new MapTile(color.ToString(), offset, true)};
		if (Vision[x][y]) {
			FillPos(x*MapSize,y*MapSize,Map[x][y][0].tile.color);
			FillPos(x*MapSize,y*MapSize,Map[x][y][1].tile.color,offset);
		}
		setTimeout(obj.Anim, bomb_animation_duration, x, y, offset, color, grow, obj);
		return true;

		Map[x][y][1] = {name : "boom", tile: new MapTile( "#" + color.toString(16) + "0000", offset, true)};
		FillPos(x*MapSize,y*MapSize,Map[x][y][0].tile.color);
		FillPos(x*MapSize,y*MapSize,Map[x][y][1].tile.color,offset);
		//UpdateVision();
		setTimeout(obj.Anim, 50, x, y, offset, color, grow, obj);
		return true;

	}
	
	Boom (range, obj)
	{
		if (range > obj.range)
			return;
		
		range++;
		
		if (obj.right)
			obj.right = obj.Anim(obj.x + range, obj.y, MapSize/2, new Color(271,0,0), true, obj);
		if (obj.left)
			obj.left = obj.Anim(obj.x - range, obj.y, MapSize/2, new Color(271,0,0), true, obj);
		if (obj.bottom)
			obj.bottom = obj.Anim(obj.x, obj.y + range, MapSize/2, new Color(271,0,0), true, obj);
		if (obj.top)
			obj.top = obj.Anim(obj.x, obj.y - range, MapSize/2, new Color(271,0,0), true, obj);
		
		setTimeout(obj.Boom, bomb_duration, range, obj);
	}
	
	constructor(x,y,range,time)
	{
		this.x = x;
		this.y = y;
		this.top = true;
		this.bottom = true;
		this.right = true;
		this.left = true;
		this.range = range;
		setTimeout(this.Boom, time, 0, this);
	}
}