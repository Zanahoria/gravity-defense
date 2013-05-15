#pragma strict

// level name and description
LevelDescriptor.levelName = "Level 2";
LevelDescriptor.levelDescription = "a basic level 2";

// initial resources
MineralResources.nbResources = 100;

var round : Round;
var wave : Wave;
var direction : Direction;

// first round
round = LevelDescriptor.CreateRound();
round.name = "Une mise en bouche";
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(45);
direction.asteroidType = "basic";
direction.asteroidNb = 16;
direction.asteroidLife = 1;
direction.moneyEarned = 5;

wave.AddDirection(direction);
round.AddWave(wave);
LevelDescriptor.AddRound(round);

// second round
round = LevelDescriptor.CreateRound();
round.name = "Une seconde mise en bouche";
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(20);
direction.asteroidType = "basic";
direction.asteroidNb = 16;
direction.asteroidLife = 1;
direction.moneyEarned = 1;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(40);
direction.asteroidType = "basic";
direction.asteroidNb = 16;
direction.asteroidLife = 1;
direction.moneyEarned = 1;

wave.AddDirection(direction);
round.AddWave(wave);
LevelDescriptor.AddRound(round);

// third round
round = LevelDescriptor.CreateRound();
round.name = "houlala !";
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(-45);
direction.asteroidType = "basic";
direction.asteroidNb = 16;
direction.asteroidLife = 1;
direction.moneyEarned = 1;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(45);
direction.asteroidType = "basic";
direction.asteroidNb = 16;
direction.asteroidLife = 1;
direction.moneyEarned = 1;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(45 + 90);
direction.asteroidType = "basic";
direction.asteroidNb = 16;
direction.asteroidLife = 1;
direction.moneyEarned = 1;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(-45 - 90);
direction.asteroidType = "basic";
direction.asteroidNb = 16;
direction.asteroidLife = 1;
direction.moneyEarned = 1;
wave.AddDirection(direction);

round.AddWave(wave);
LevelDescriptor.AddRound(round);

// fourth round
round = LevelDescriptor.CreateRound();
round.name = "Quel est ce nouveau type d'asteroid ?!!";
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(125 + 60);
direction.asteroidType = "splittable";
direction.asteroidNb = 3;
direction.asteroidLife = 2;
direction.asteroidScale = 2;
direction.moneyEarned = 2;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(125);
direction.asteroidType = "basic";
direction.asteroidNb = 3;
direction.asteroidLife = 2;
direction.asteroidScale = 2;
direction.moneyEarned = 2;
wave.AddDirection(direction);

round.AddWave(wave);
LevelDescriptor.AddRound(round);

// fifth round
round = LevelDescriptor.CreateRound();
round.name = "C'est la folie !";
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(0);
direction.asteroidType = "splittable";
direction.asteroidNb = 10;
direction.asteroidLife = 4;
direction.asteroidScale = 2;
direction.moneyEarned = 10;
direction.accuracy = 0;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(5);
direction.asteroidType = "splittable";
direction.asteroidNb = 10;
direction.asteroidLife = 4;
direction.asteroidScale = 2;
direction.moneyEarned = 10;
direction.accuracy = 0;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(-5);
direction.asteroidType = "splittable";
direction.asteroidNb = 10;
direction.asteroidLife = 4;
direction.asteroidScale = 2;
direction.moneyEarned = 10;
direction.accuracy = 0;
wave.AddDirection(direction);

round.AddWave(wave);

// second wave

wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(0 + 180);
direction.asteroidType = "splittable";
direction.asteroidNb = 10;
direction.asteroidLife = 4;
direction.asteroidScale = 2;
direction.moneyEarned = 10;
direction.accuracy = 0;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(5 + 180);
direction.asteroidType = "splittable";
direction.asteroidNb = 10;
direction.asteroidLife = 4;
direction.asteroidScale = 2;
direction.moneyEarned = 10;
direction.accuracy = 0;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(-5 + 180);
direction.asteroidType = "splittable";
direction.asteroidNb = 10;
direction.asteroidLife = 4;
direction.asteroidScale = 2;
direction.moneyEarned = 10;
direction.accuracy = 0;
wave.AddDirection(direction);

round.AddWave(wave);
LevelDescriptor.AddRound(round);

// sixth round
round = LevelDescriptor.CreateRound();
round.name = "Boss time !";
round.moneyEarned = 50;
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(90);
direction.asteroidType = "splittable";
direction.asteroidNb = 1;
direction.asteroidLife = 16;
direction.asteroidScale = 16;
direction.moneyEarned = 25;
wave.AddDirection(direction);

round.AddWave(wave);
LevelDescriptor.AddRound(round);

// seventh round
round = LevelDescriptor.CreateRound();
round.name = "Did you survive ?";
round.moneyEarned = 50;
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(45);
direction.asteroidType = "basic";
direction.asteroidNb = 16;
direction.asteroidLife = 2;
direction.moneyEarned = 1;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(40);
direction.asteroidType = "basic";
direction.asteroidNb = 16;
direction.asteroidLife = 2;
direction.moneyEarned = 1;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(200);
direction.asteroidType = "basic";
direction.asteroidNb = 16;
direction.asteroidLife = 2;
direction.moneyEarned = 1;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(205);
direction.asteroidType = "basic";
direction.asteroidNb = 16;
direction.asteroidLife = 2;
direction.moneyEarned = 1;
wave.AddDirection(direction);

round.AddWave(wave);
LevelDescriptor.AddRound(round);

// eighth round
round = LevelDescriptor.CreateRound();
round.name = "Alien invasion !";
round.moneyEarned = 50;
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(-45);
direction.asteroidType = "ship";
direction.asteroidNb = 20;
direction.asteroidLife = 2;
direction.moneyEarned = 1;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(-40);
direction.asteroidType = "ship";
direction.asteroidNb = 20;
direction.asteroidLife = 2;
direction.moneyEarned = 1;
wave.AddDirection(direction);

round.AddWave(wave);

// wave 2
wave = LevelDescriptor.CreateWave();

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(-60);
direction.asteroidType = "ship";
direction.asteroidNb = 20;
direction.asteroidLife = 2;
direction.moneyEarned = 1;
wave.AddDirection(direction);

direction = LevelDescriptor.CreateDirection();
direction.angle = convertAngle(-25);
direction.asteroidType = "ship";
direction.asteroidNb = 20;
direction.asteroidLife = 2;
direction.moneyEarned = 1;
wave.AddDirection(direction);

round.AddWave(wave);
LevelDescriptor.AddRound(round);


// level loading
LevelDescriptor.Load();

function convertAngle(angle : float)
{
	return (angle * 3.14 / 180.0);
}

