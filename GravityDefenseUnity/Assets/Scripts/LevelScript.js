#pragma strict

LevelDescriptor.levelName = "Test";
LevelDescriptor.levelDescription = "a basic test";

//initial resources
MineralResources.nbResources = 200;

// first round
var round = LevelDescriptor.CreateRound();
var wave = LevelDescriptor.CreateWave();
var direction = LevelDescriptor.CreateDirection();

wave.AddDirection(direction);
round.AddWave(wave);

LevelDescriptor.AddRound(round);

// second round
round = LevelDescriptor.CreateRound();
wave = LevelDescriptor.CreateWave();
direction = LevelDescriptor.CreateDirection();
direction.angle = 90.0 * 3.14 / 180.0;

wave.AddDirection(direction);
round.AddWave(wave);

LevelDescriptor.AddRound(round);




// load of the level
LevelDescriptor.Load();
