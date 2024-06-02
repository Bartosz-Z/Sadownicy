/*var number_of_trees = 5; //im wiÄ?ksza liczba tym mniej
var number_of_points = 8; //im wiÄ?ksza liczba tym mniej
var tileset_id = Math.floor(Math.random() * tilesets.length);

var enemy_intelligence = 6;//im mniejsza (min 1) liczba tym inteligentniejsi
var enemy_speed = 400; //odsÄ?py miÄ?dzy ruchami AI w ms
var number_of_enemies = 20; //im wiÄ?ksza liczba tym mniej

var fog_of_war = true; //kiedy FALSE odkrywa caÅ?Ä? mapÄ?
var flashLightMode = false; //kiedy TRUE pole widzenie gracza jest ograniczone do stoÅŸka
var player_sight_range = 6; //zasiÄ?g widzenia gracza (max 6)

var bomb_duration = 200;
var bomb_animation_duration = 50;
var bomb_wait_time = 1500;
var bomb_range = 5;

if (localStorage.hasOwnProperty("trees"))
	number_of_trees = Number(localStorage.trees);
if (localStorage.hasOwnProperty("points"))
	number_of_points = Number(localStorage.points);
if (localStorage.hasOwnProperty("fog_of_war"))
	fog_of_war = (localStorage.fog_of_war == "false" ? false : true);
if (localStorage.hasOwnProperty("tileset")) {
	if (Number(localStorage.tileset) == -1)
		localStorage.tileset = Math.floor(Math.random() * tilesets.length);
	tileset_id = Number(localStorage.tileset);
}
if (localStorage.hasOwnProperty("enemies"))
	number_of_enemies = Number(localStorage.enemies);
if (localStorage.hasOwnProperty("enemy_intelligence"))
	enemy_intelligence = Number(localStorage.enemy_intelligence);
if (localStorage.hasOwnProperty("enemy_speed"))
	enemy_speed = Number(localStorage.enemy_speed);
if (localStorage.hasOwnProperty("sight_range"))
	player_sight_range = Number(localStorage.sight_range);
if (localStorage.hasOwnProperty("flashLightMode"))
	flashLightMode = (localStorage.flashLightMode == "false" ? false : true);
*/
//VERSION: 2.0.0

var number_of_trees = 5; //im wiÄ?ksza liczba tym mniej
var number_of_points = 8; //im wiÄ?ksza liczba tym mniej
var tileset_id = Math.floor(Math.random() * tilesets.length);

var enemy_intelligence = 6;//im mniejsza (min 1) liczba tym inteligentniejsi
var enemy_speed = 400; //odsÄ?py miÄ?dzy ruchami AI w ms
var number_of_enemies = 20; //im wiÄ?ksza liczba tym mniej

var fog_of_war = true; //kiedy FALSE odkrywa caÅ?Ä? mapÄ?
var flashLightMode = false; //kiedy TRUE pole widzenie gracza jest ograniczone do stoÅŸka
var player_sight_range = 6; //zasiÄ?g widzenia gracza (max 6)

var bomb_animation_duration = 50;
var bomb_duration = 200;
var bomb_wait_time = 1500;
var bomb_range = 4;

var shot_duration = 50;
var shot_range = 6;

if (localStorage.hasOwnProperty("trees"))
	number_of_trees = Number(localStorage.trees);
if (localStorage.hasOwnProperty("points"))
	number_of_points = Number(localStorage.points);
if (localStorage.hasOwnProperty("fog_of_war"))
	fog_of_war = (localStorage.fog_of_war == "false" ? false : true);
if (localStorage.hasOwnProperty("tileset")) {
	if (Number(localStorage.tileset) == -1)
		localStorage.tileset = Math.floor(Math.random() * tilesets.length);
	tileset_id = Number(localStorage.tileset);
}
if (localStorage.hasOwnProperty("enemies"))
	number_of_enemies = Number(localStorage.enemies);
if (localStorage.hasOwnProperty("enemy_intelligence"))
	enemy_intelligence = Number(localStorage.enemy_intelligence);
if (localStorage.hasOwnProperty("enemy_speed"))
	enemy_speed = Number(localStorage.enemy_speed);
if (localStorage.hasOwnProperty("sight_range"))
	player_sight_range = Number(localStorage.sight_range);
if (localStorage.hasOwnProperty("flashLightMode"))
	flashLightMode = (localStorage.flashLightMode == "false" ? false : true);

//VERSION: 2.0.0