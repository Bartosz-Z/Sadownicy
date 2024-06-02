class enemy
{
	MoveTo (x,y)
	{
		if (Map[x][y][1].name != "none")
			return;
		
		Map[this.x][this.y][1] = tileset_target.getTile("none");
		
		this.x = x;
		this.y = y;
		
		Map[x][y][1] = {name : this.name, tile : new MapTile(this.color, this.offset, true)};
	}
	
	NextStep ()
	{
		if (end_of_the_game)
			return;
		
		if (this.wallsToGo == 0)
			this.NewPath();
		
		var x = this.x;
		var y = this.y;
		
		switch (this.dir)
		{
			case 0:
				y--;
				break;
			case 1:
				x++;
				break;
			case 2:
				y++;
				break;
			case 3:
				x--;
				break;
		}
		
		if (Map[x][y][1].name == "boom") {
			this.Kill();
			return;
		}
		
		if (Map[x][y][1].name == "player")
			KillPlayer(x, y);
		
		if (Map[x][y][1].name == "none")
			this.MoveTo(x, y);
		else
			this.was_obs = true;
		
		this.wallsToGo--;
	}
	
	FindNearestPlayer ()
	{
		var dis = 10000000.0;
		var id = -1;
		for (var i=0; i < players.length; i++)
		{
			if (!players[i].alive)
				continue;
			var temp_dis = (this.x - players[i].x) * (this.x - players[i].x) + (this.y - players[i].y) * (this.y - players[i].y);
			if (temp_dis < dis)
			{
				dis = temp_dis;
				id = i;
			}
		}
		return id;
	}
	
	NewPath ()
	{
		if (this.wallsToGo)
			return;
		
		if (this.was_obs)
		{
			switch (this.dir)
			{
				case 0:
					if (Math.random() < 0.5)
						this.dir = 3;
					else
						this.dir = 1;
				break;
				case 1:
					if (Math.random() < 0.5)
						this.dir = 0;
					else
						this.dir = 2;
				break;
				case 2:
					if (Math.random() < 0.5)
						this.dir = 1;
					else
						this.dir = 3;
				break;
				case 3:
					if (Math.random() < 0.5)
						this.dir = 0;
					else
						this.dir = 2;
				break;
			}
			
			this.was_obs = false;
		}
		else
		{
			if (this.FindNearestPlayer() == -1)
				return;
			
			var target_x = players[this.FindNearestPlayer()].x;
			var target_y = players[this.FindNearestPlayer()].y;
			if (target_x >= this.x && Math.abs(target_y - this.y) <= Math.abs(target_x - this.x))
				this.dir = 1;
			else if (target_x <= this.x && Math.abs(target_y - this.y) <= Math.abs(target_x - this.x))
				this.dir = 3;
			else if (target_y > this.y && Math.abs(target_y - this.y) > Math.abs(target_x - this.x))
				this.dir = 2;
			else
				this.dir = 0;
		}
		this.wallsToGo = RandomRange(1,enemy_intelligence);
	}
	
	Kill () {
		this.alive = false;
		Map[this.x][this.y][1] = tileset_target.getTile("none");
	}
	
	constructor (name,color,x,y,offset)
	{
		this.alive = true;
		
		this.name = name;
		this.color = color;
		
		this.x = x;
		this.y = y;
		
		this.offset = offset;
		
		Map[x][y][1] = {name : this.name, tile : new MapTile(this.color, this.offset, true)};
			
		this.dir = 0;
		this.was_obs = false;
		
		this.wallsToGo = 0;
		
		this.NewPath();
	}
}

var enemies;

function AddEnemies ()
{
	enemies = new Array(0);
	
	for (var i=edge; i < Map.length-edge; i++)
		for (var j=edge; j < Map[i].length-edge; j++)
			if (Map[i][j][1].name == "enemy")
				enemies.push(new enemy("enemy", tileset_target.enemy, i, j, true, 2));
}

function SetEnemies ()
{
	enemies = new Array(0);
	
	for (var i=edge; i < Map.length-edge; i++)
	{
		for (var j=edge; j < Map[i].length-edge; j++)
		{
			var ok = false;
			
			for (var s=0; s < start_x.length && s < start_y.length; s++)
			{
				if(Math.abs(i - start_x[s]) <= 3 && Math.abs(j - start_y[s]) <= 3)
				{
					ok = true;
					break;
				}
			}
			
			if (ok)
				continue;
			
			if (Map[i][j][1].name == "none" && RandomRange(0,number_of_enemies) == 0)
				enemies.push(new enemy("enemy", tileset_target.enemy, i, j, true, 2));
		}	
	}
		
			
	UpdateVision();
}
if (map_string === undefined)
	SetEnemies();
else
	AddEnemies();

function MoveEnemies ()
{
	for (var i=0; i < enemies.length; i++)
		if (enemies[i].alive)
			enemies[i].NextStep();
	
	UpdateVision();
}

function KillEnemy (x,y) {
	for (var i=0; i < enemies.length; i++)
	{
		if (!enemies[i].alive)
			continue;
		if (enemies[i].x == x && enemies[i].y == y)
		{
			enemies[i].Kill();
			break;
		}
	}
}

setInterval(MoveEnemies, enemy_speed);