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
<<<<<<< HEAD
direction.asteroidType = "ship";
=======
direction.asteroidType = "splittable";
direction.asteroidLife = 2;
direction.asteroidScale = 2;
>>>>>>> dedfa6cd4744803cd1c2be1b90f21c17dbe09cec
wave.AddDirection(direction);

round.AddWave(wave);

LevelDescriptor.AddRound(round);

// second round
round = LevelDescriptor.CreateRound();
wave = LevelDescriptor.CreateWave();
direction = LevelDescriptor.CreateDirection();
direction.angle = 90.0 * 3.14 / 180.0;
<<<<<<< HEAD
direction.asteroidType = "ship";
=======
direction.asteroidType = "splittable";
direction.asteroidLife = 8;
direction.asteroidScale = 8;
direction.asteroidNb = 1;
>>>>>>> dedfa6cd4744803cd1c2be1b90f21c17dbe09cec

wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = 45.0 * 3.14 / 180.0;
<<<<<<< HEAD
direction.asteroidNb = 24;
direction.asteroidType = "ship";
=======
direction.asteroidLife = 8;
direction.asteroidNb = 1;
direction.asteroidType = "basic";
direction.accuracy = 0.1;
>>>>>>> dedfa6cd4744803cd1c2be1b90f21c17dbe09cec
wave.AddDirection(direction);

round.AddWave(wave);

LevelDescriptor.AddRound(round);





// level loading
LevelDescriptor.Load();
