#pragma strict

// level name and description
LevelDescriptor.levelName = "Test";
LevelDescriptor.levelDescription = "a basic test";

// initial resources
MineralResources.nbResources = 200;

// first round
var round = LevelDescriptor.CreateRound();
var wave = LevelDescriptor.CreateWave();
var direction = LevelDescriptor.CreateDirection();
direction.asteroidType = "splittable";
wave.AddDirection(direction);

round.AddWave(wave);

LevelDescriptor.AddRound(round);

// second round
round = LevelDescriptor.CreateRound();
wave = LevelDescriptor.CreateWave();
direction = LevelDescriptor.CreateDirection();
direction.angle = 90.0 * 3.14 / 180.0;
direction.asteroidType = "splittable";

wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = 45.0 * 3.14 / 180.0;
direction.asteroidNb = 24;
direction.asteroidType = "basic";
direction.accuracy = 0.1;
wave.AddDirection(direction);

round.AddWave(wave);

LevelDescriptor.AddRound(round);





// level loading
LevelDescriptor.Load();
