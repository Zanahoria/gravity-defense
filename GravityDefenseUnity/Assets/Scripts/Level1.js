#pragma strict
// level name and description
LevelDescriptor.levelName = "Level 1";
LevelDescriptor.levelDescription = "a basic level 1";

// initial resources
MineralResources.nbResources = 100;

var round : Round;
var wave : Wave;
var direction : Direction;

// first round
round = LevelDescriptor.CreateRound();
round.name = "Add your first planet";
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(45);
direction.asteroidType = "basic";
direction.asteroidNb = 5;
direction.asteroidLife = 1;
direction.moneyEarned = 5;

wave.AddDirection(direction);
round.AddWave(wave);
LevelDescriptor.AddRound(round);

// second round
round = LevelDescriptor.CreateRound();
round.name = "Move your planet";
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(120);
direction.asteroidType = "basic";
direction.asteroidNb = 5;
direction.asteroidLife = 1;
direction.moneyEarned = 5;

wave.AddDirection(direction);
round.AddWave(wave);
LevelDescriptor.AddRound(round);

// third round
round = LevelDescriptor.CreateRound();
round.name = "Collide asteroids between them";
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(60);
direction.asteroidType = "basic";
direction.asteroidNb = 5;
direction.asteroidLife = 1;
direction.moneyEarned = 5;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(100);
direction.asteroidType = "basic";
direction.asteroidNb = 5;
direction.asteroidLife = 1;
direction.moneyEarned = 5;

wave.AddDirection(direction);
round.AddWave(wave);
LevelDescriptor.AddRound(round);

// fourth round
round = LevelDescriptor.CreateRound();
round.name = "Add a new planet";
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(-45);
direction.asteroidType = "basic";
direction.asteroidNb = 5;
direction.asteroidLife = 1;
direction.moneyEarned = 5;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(90);
direction.asteroidType = "basic";
direction.asteroidNb = 5;
direction.asteroidLife = 1;
direction.moneyEarned = 5;
wave.AddDirection(direction);

round.AddWave(wave);
LevelDescriptor.AddRound(round);

// fifth round
round = LevelDescriptor.CreateRound();
round.name = "Introduce Splittable asteroids";
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(-100);
direction.asteroidType = "splittable";
direction.asteroidNb = 5;
direction.asteroidLife = 2;
direction.asteroidScale = 2;
direction.moneyEarned = 5;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(50);
direction.asteroidType = "splittable";
direction.asteroidNb = 5;
direction.asteroidLife = 2;
direction.asteroidScale = 2;
direction.moneyEarned = 5;
wave.AddDirection(direction);

round.AddWave(wave);
LevelDescriptor.AddRound(round);

// sixth round
round = LevelDescriptor.CreateRound();
round.name = "Add the laser upgrade on a planet";
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(0);
direction.asteroidType = "splittable";
direction.asteroidNb = 10;
direction.asteroidLife = 4;
direction.asteroidScale = 2;
direction.moneyEarned = 5;
direction.accuracy = 0;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(30);
direction.asteroidType = "splittable";
direction.asteroidNb = 10;
direction.asteroidLife = 4;
direction.asteroidScale = 2;
direction.moneyEarned = 5;
direction.accuracy = 0;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(-60);
direction.asteroidType = "splittable";
direction.asteroidNb = 10;
direction.asteroidLife = 4;
direction.asteroidScale = 2;
direction.moneyEarned = 5;
direction.accuracy = 0;
wave.AddDirection(direction);

round.AddWave(wave);
LevelDescriptor.AddRound(round);

// seventh round
round = LevelDescriptor.CreateRound();
round.name = "Add the bouncy shield upgrade on a planet";
round.moneyEarned = 200;
wave = LevelDescriptor.CreateWave();


direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(-30);
direction.asteroidType = "basic";
direction.asteroidNb = 5;
direction.asteroidLife = 2;
direction.asteroidScale = 2;
direction.moneyEarned = 5;
direction.accuracy = 0;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(-35);
direction.asteroidType = "basic";
direction.asteroidNb = 5;
direction.asteroidLife = 2;
direction.asteroidScale = 2;
direction.moneyEarned = 5;
direction.accuracy = 0;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(-25);
direction.asteroidType = "basic";
direction.asteroidNb = 5;
direction.asteroidLife = 2;
direction.asteroidScale = 2;
direction.moneyEarned = 5;
direction.accuracy = 0;
wave.AddDirection(direction);

round.AddWave(wave);
LevelDescriptor.AddRound(round);

// eight round
round = LevelDescriptor.CreateRound();
round.name = "Create another planet and add the destruction shield upgrade on it";
round.moneyEarned = 50;
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(0);
direction.asteroidType = "basic";
direction.asteroidNb = 10;
direction.asteroidLife = 2;
direction.moneyEarned = 5;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(135);
direction.asteroidType = "splittable";
direction.asteroidNb = 5;
direction.asteroidLife = 2;
direction.moneyEarned = 5;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(270);
direction.asteroidType = "ship";
direction.asteroidNb = 1;
direction.asteroidLife = 2;
direction.moneyEarned = 5;
wave.AddDirection(direction);

round.AddWave(wave);
LevelDescriptor.AddRound(round);

// level loading
LevelDescriptor.Load();

function convertAngle(angle : float)
{
	return (angle * 3.14 / 180.0);
}

