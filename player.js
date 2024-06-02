class player
{
	CoverSight ()
	{
		for (var i=-this.sight_range; i <=  this.sight_range; i++)
			for (var j=-this.sight_range; j <=  this.sight_range; j++)
				if (this.x+i >= 0 && this.x+i < Map.length && this.y+j >= 0 && this.y+j < Map[0].length)
					Vision[this.x+i][this.y+j] = !fog_of_war;
	}
	
	FlashlightUncoverSight (dir)
	{
		for (var i=-this.sight_range; i <=  this.sight_range; i++)
			for (var j=-this.sight_range; j <=  this.sight_range; j++)
				if (i*i + j*j >= (this.sight_range-1) * (this.sight_range-1) && i*i + j*j <= this.sight_range * this.sight_range)
				{
					if (this.x+i >= 0 && this.x+i < Map.length && this.y+j >= 0 && this.y+j < Map[0].length )
					{
						switch (dir)
						{
							case 0:
							if (Math.abs(i) <= Math.abs(j))
								for (var x=1; x <= -j; x++)
								{
									if (Map[this.x+SymRound(i*x/j)][this.y+x*Math.abs(j)/j][1].tile.name != "none" && Map[this.x+SymRound(i*x/j)][this.y+x*Math.abs(j)/j][1].tile.transparent != true)
									{
										Vision[this.x+SymRound(i*x/j)][this.y+x*Math.abs(j)/j] = true;
										break;
									} else {
										Vision[this.x+SymRound(i*x/j)][this.y+x*Math.abs(j)/j] = true;
									}
								}
							break;
							
							case 1:
							if (Math.abs(i) >= Math.abs(j))
								for (var x=1; x <= i; x++)
								{
									if (Map[this.x+x*Math.abs(i)/i][this.y+SymRound(j*x/i)][1].tile.name != "none" && Map[this.x+x*Math.abs(i)/i][this.y+SymRound(j*x/i)][1].tile.transparent != true)
									{
										Vision[this.x+x*Math.abs(i)/i][this.y+SymRound(j*x/i)] = true;
										break;
									} else {
										Vision[this.x+x*Math.abs(i)/i][this.y+SymRound(j*x/i)] = true;
									}
								}
							break;
							
							case 2:
							if (Math.abs(i) <= Math.abs(j))
								for (var x=1; x <= j; x++)
								{
									if (Map[this.x+SymRound(i*x/j)][this.y+x*Math.abs(j)/j][1].tile.name != "none" && Map[this.x+SymRound(i*x/j)][this.y+x*Math.abs(j)/j][1].tile.transparent != true)
									{
										Vision[this.x+SymRound(i*x/j)][this.y+x*Math.abs(j)/j] = true;
										break;
									} else {
										Vision[this.x+SymRound(i*x/j)][this.y+x*Math.abs(j)/j] = true;
									}
								}
							break;
							
							case 3:
							if (Math.abs(i) >= Math.abs(j))
								for (var x=1; x <= -i; x++)
								{
									if (Map[this.x+x*Math.abs(i)/i][this.y+SymRound(j*x/i)][1].tile.name != "none" && Map[this.x+x*Math.abs(i)/i][this.y+SymRound(j*x/i)][1].tile.transparent != true)
									{
										Vision[this.x+x*Math.abs(i)/i][this.y+SymRound(j*x/i)] = true;
										break;
									} else {
										Vision[this.x+x*Math.abs(i)/i][this.y+SymRound(j*x/i)] = true;
									}
								}
							break;
						}

					}
				}
					
		Vision[this.x][this.y] = true;
	}
	
	UncoverSight (sight_range)
	{
		if (!this.alive)
			return;

		for (var i=-sight_range; i <=  sight_range; i++)
			for (var j=-sight_range; j <=  sight_range; j++)
				if (i*i + j*j >= (sight_range-1) * (sight_range-1) && i*i + j*j <= sight_range * sight_range)
				{
					if (this.x+i >= 0 && this.x+i < Map.length && this.y+j >= 0 && this.y+j < Map[0].length )
					{
						if ( Math.abs(i) >= Math.abs(j))
							for (var x=1; x <= Math.abs(i); x++)
							{
								if (Map[this.x+x*Math.abs(i)/i][this.y+SymRound(j*x/i)][1].tile.name != "none" && Map[this.x+x*Math.abs(i)/i][this.y+SymRound(j*x/i)][1].tile.transparent != true)
								{
									Vision[this.x+x*Math.abs(i)/i][this.y+SymRound(j*x/i)] = true;
									break;
								} else {
									Vision[this.x+x*Math.abs(i)/i][this.y+SymRound(j*x/i)] = true;
								}
							}
						else
							for (var x=1; x <= Math.abs(j); x++)
							{
								if (Map[this.x+SymRound(i*x/j)][this.y+x*Math.abs(j)/j][1].tile.name != "none" && Map[this.x+SymRound(i*x/j)][this.y+x*Math.abs(j)/j][1].tile.transparent != true)
								{
									Vision[this.x+SymRound(i*x/j)][this.y+x*Math.abs(j)/j] = true;
									break;
								} else {
									Vision[this.x+SymRound(i*x/j)][this.y+x*Math.abs(j)/j] = true;
								}
							}
					}
				}
					
		Vision[this.x][this.y] = true;
	}
	
	MoveTo (x,y)
	{
		if (x < edge || y < edge || x > Map.length - edge - 1 || y > Map[0].length - edge - 1 || Map[x][y][1].tile.name != "none")
			return;
		
		this.CoverSight();
		Map[this.x][this.y][1] = tileset_target.getTile("none");
		
		this.x = x;
		this.y = y;
		
		Map[x][y][1] = {name : this.name, tile : new MapTile(this.color, this.offset, true)};

		UpdateVision();
	}
	
	MoveBy (x,y)
	{
		if (this.x + x < edge || this.y + y < edge || this.x + x > Map.length - edge - 1 || this.y + y > Map[0].length - edge - 1)
			return;
		
		if (y == -1)
			this.dir = 0;
		else if (x == 1)
			this.dir = 1;
		else if (y == 1)
			this.dir = 2;
		else
			this.dir = 3;
		
		switch (Map[this.x + x][this.y + y][1].name)
		{
			case "point":
				this.points++;
				points_left--;
				UpdatePoints();
			break;
			
			case "none":
			
			break;
			
			case "Boom":
				KillPlayer(this.x, this.y);
			
			default:
				return;
		}
		
		this.CoverSight();
		Map[this.x][this.y][1] = tileset_target.getTile("none");
		
		this.x += x;
		this.y += y;
		
		Map[this.x][this.y][1] = {name : this.name, tile : new MapTile(this.color, this.offset, true)};
		
		if (this.flashLightMode)
			this.FlashlightUncoverSight(this.dir);
		else
			this.UncoverSight(this.sight_range);
		
		UpdateVision();
	}
	
	Kill ()
	{
		this.alive = false;
		Map[this.x][this.y][1] = tileset_target.getTile("none");
		players_left--;
		this.CoverSight();
		UpdateVision();
	}
	
	constructor(name,color,x,y,offset)
	{
		this.name = name;
		this.color = color;
		this.sight_range = player_sight_range;
		
		this.x = x;
		this.y = y;
		
		this.offset = offset;
		
		this.flashLightMode = flashLightMode;

		Map[x][y][1] = {name : this.name, tile : new MapTile(this.color, this.offset, true)};
		
		this.alive = true;
		this.points = 0;
		
		this.dir = 1;
		
		if (this.flashLightMode)
			this.FlashlightUncoverSight(this.dir);
		else
			this.UncoverSight(this.sight_range);
		
		UpdateVision();
	}
}

var players = [];
var players_left = 0;

function SetPlayers()
{
	players_left = Number(localStorage.players);
	for (var i=0; i < players_left; i++)
		players.push(new player("player", tileset_target.player, start_x[i], start_y[i], 1));
}

SetPlayers();
UpdatePoints();

var x=0, y=0, x2=0, y2=0;

function myFunction(event) {
	x = event.touches[0].clientX;
	y = event.touches[0].clientY; 
}
function myFunction2(event) {
	x2 = event.touches[0].clientX;
	y2 = event.touches[0].clientY;
}

function endt() {
  var dx = x - x2;
  var dy = y - y2;
  
  if(Math.abs(dx) > Math.abs(dy)){
  if(dx<0)
  players[0].MoveBy(1,0);
  else
  players[0].MoveBy(-1,0);
 } else {
 if (dy<0)
  players[0].MoveBy(0,1);
else
  players[0].MoveBy(0,-1);
 }}

window.addEventListener('keydown', function (event) {	
	switch (event.keyCode)
	{
		case 37:
			if (players[0].alive)
				players[0].MoveBy(-1,0); //w lewo
		break;
		case 38:
			if (players[0].alive)
				players[0].MoveBy(0,-1); //w górê
		break;
		case 39:
			if (players[0].alive)
				players[0].MoveBy(1,0); //w prawo
		break;
		case 40:
			if (players[0].alive)
				players[0].MoveBy(0,1); //w dó³
		break;
		case 32:
			if (players[0].alive)
				new Bomb(players[0].x, players[0].y, bomb_range, bomb_wait_time); //bomba (spacja)
		break;
		case 66:
			if (players[0].alive)
				new Weapon(players[0].x, players[0].y, shot_range, players[0].dir); //broñ (b)
		break;
		//-----------------------------
		case 65:
			if (players.length > 1) {
				if (players[1].alive)
					players[1].MoveBy(-1,0); //w lewo (a)
			} else {
				if (players[0].alive)
					players[0].MoveBy(-1,0);
			}
		break;
		case 87:
			if (players.length > 1) {
				if (players[1].alive)
					players[1].MoveBy(0,-1); //w górê (w)
			} else {
				if (players[0].alive)
					players[0].MoveBy(0,-1);
			}
		break;
		case 68:
			if (players.length > 1) {
				if (players[1].alive)
					players[1].MoveBy(1,0); //w prawo (d)
			} else {
				if (players[0].alive)
					players[0].MoveBy(1,0);
			}
		break;
		case 83:
			if (players.length > 1) {
				if (players[1].alive)
					players[1].MoveBy(0,1); //w dó³ (s)
			} else {
				if (players[0].alive)
					players[0].MoveBy(0,1);
			}
		break;
		case 81:
			if (players.length > 1) {
				if (players[1].alive)
					new Bomb(players[1].x, players[1].y, bomb_range, bomb_wait_time); //bomba (q)
			} else {
				if (players[0].alive)
					new Bomb(players[0].x, players[0].y, bomb_range, bomb_wait_time);
			}
		break;
		case 69:
			if (players.length > 1) {
				if (players[1].alive)
					new Weapon(players[1].x, players[1].y, shot_range, players[1].dir); //broñ (e)
			} else {
				if (players[0].alive)
					new Weapon(players[0].x, players[0].y, shot_range, players[0].dir);
			}
		break;
	}
}, false);
