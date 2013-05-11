#pragma strict

class Direction
{
	var angle : float = 0.0;
	var asteroidNb : int = 5;
	var asteroidType : String = "basic";
	var asteroidLife : int = 2;
	var moneyEarned : int = 5;
	var attractCoef : float = 1.0;
	var delay : float = 0.0;
}

class Wave
{
	var directions = List.<Direction>();
	var AddDirection = function(direction : Direction)
	{
		directions.Add(direction);
	};
}

class Round
{
	var name : String = "crazy round";
	var moneyEarned : int = 50;
	var waves = List.<Wave>();
	var AddWave = function(wave : Wave)
	{
		waves.Add(wave);
	};
}

public var Asteroid : GameObject;

public static var ISWAITING : int = 0;
public static var ISROUNDING : int = 1;

static public var state : int = ISWAITING;

static public var nbEnemies = 0;
static public var roundId = 0;

static public var levelName : String;
static public var levelDescription : String;

static private var rounds = List.<Round>();
static private var lineList = List.<GameObject>();
private var nbWave = 0;

static public function AddRound(round : Round)
{
	rounds.Add(round);
}

static public function CreateWave()
{
	return new Wave();
}

static public function CreateDirection()
{
	
	return new Direction();
}

static public function CreateRound()
{
	return new Round();
}

function Start()
{
	roundId = 0;
	nbWave = 0;
	state = ISWAITING;
	nbEnemies = 0;
	clearRounds();
}

function clearRounds()
{
	while (rounds.Count)
	{
		while (rounds[0].waves.Count)
		{
			while (rounds[0].waves[0].directions.Count)
			{
				rounds[0].waves[0].directions.RemoveAt(0);
			}
			rounds[0].waves.RemoveAt(0);
		}
		rounds.RemoveAt(0);
	}
}

function Update ()
{
	if (roundId >= rounds.Count)
		return ;
	if (state == ISROUNDING)
	{
		if (nbEnemies == 0)
		{
			if (nbWave == 0)
				RemoveLines();
			if (nbWave < rounds[roundId].waves.Count)
				LaunchWave();
			else
			{
				nbWave = 0;
				state = ISWAITING;
				MineralResources.nbResources += rounds[roundId].moneyEarned;
				++roundId;
				if (!Sun.isDead)
					PrepareWaves();
			}
		}
	}
}

function LaunchWave()
{
	for (var direction in rounds[roundId].waves[nbWave].directions)
	{
		for (var j : int = 0; j < direction.asteroidNb; ++j)
		{
			var addAngle = Random.value * 0.05 - 0.025;
			var asteroid = Instantiate(Asteroid, Vector3((40 + j) * Mathf.Cos(direction.angle + addAngle), 0,
			(40 + j) * Mathf.Sin(direction.angle + addAngle)), Quaternion.identity);
			var life = asteroid.GetComponent(Life);
			life.maxLife = direction.asteroidLife;
			life.currentLife = direction.asteroidLife;
			asteroid.GetComponent(AsteroidSettings).nbResourcesEarned = direction.moneyEarned;
			asteroid.GetComponent(Gravity).attractCoef = direction.attractCoef;
			++nbEnemies;
		}
	}
	++nbWave;
}

static function Load()
{
	PrepareWaves();
}

static function PrepareWaves()
{
	var lineObject = GameObject.Find("line");
	if (roundId < rounds.Count)
	{
		for (var wave in rounds[roundId].waves)
		{
			for (var direction in wave.directions)
			{
				var angle : float = direction.angle;
				var line : GameObject = Instantiate(lineObject, Vector3(), Quaternion.identity);
				var linerd : LineRenderer = line.GetComponent(LineRenderer);
				linerd.SetPosition(0, Vector3(4 * Mathf.Cos(angle), 0, 4 * Mathf.Sin(angle)));
				linerd.SetPosition(1, Vector3(50 * Mathf.Cos(angle), 0, 50 * Mathf.Sin(angle)));
				lineList.Add(line);
			}
		}
	}
}

function RemoveLines()
{
	for (var i : GameObject in lineList)
		Destroy(i);
	lineList.Clear();
}

//public var attractCoef : float = 1.0;
//public var nbEnnemiesByWaves : int = 5;
//public var nbDirections : int = 1;
//public var nbWavesByRounds : int = 2;
//
//private var nbWave = 0;
//private var lineList = List.<GameObject>();
//private var currentRound : int = 0;
//
//private var level : int = 0;
//
//private var rounds : int[] = [1, 1, 2, 3];
//
//function Start ()
//{
//	state = ISWAITING;
//	nbEnemies = 0;
//	nbDirections = rounds[currentRound] + level;
//	PrepareWaves();
//}

//function PrepareWaves()
//{
//	for (var k : int = 0; k < nbWavesByRounds; ++k)
//	{
//		for (var i : int = 0; i < nbDirections; ++i)
//		{
//			var angle : float = Random.value * 3.14 * 2.0;
//			directionList.Add(angle);
//
//			var line : GameObject = Instantiate(lineObject, Vector3(), Quaternion.identity);
//			var linerd : LineRenderer = line.GetComponent(LineRenderer);
//			linerd.SetPosition(0, Vector3(4 * Mathf.Cos(angle), 0, 4 * Mathf.Sin(angle)));
//			linerd.SetPosition(1, Vector3(50 * Mathf.Cos(angle), 0, 50 * Mathf.Sin(angle)));
//			lineList.Add(line);
//		}
//	}
//}
//
//function LaunchWave()
//{
//	for (var i : int = 0; i < nbDirections; ++i)
//	{
//		var direction = directionList[0];
//		directionList.RemoveAt(0);
//		for (var j : int = 0; j < nbEnnemiesByWaves; ++j)
//		{
//			var addAngle = Random.value * 0.05 - 0.025;
//			var asteroid : Gravity = Instantiate(asteroid, Vector3((40 + j) * Mathf.Cos(direction + addAngle), 0,
//			(40 + j) * Mathf.Sin(direction + addAngle)), Quaternion.identity);
//			asteroid.attractCoef = attractCoef;
//			++nbEnemies;
//		}
//	}
//	++nbWave;
//}
//
//function Update ()
//{
//	if (state == ISROUNDING)
//	{
//		if (nbEnemies == 0)
//		{
//			if (nbWave == 0)
//			{
//				for (var i : GameObject in lineList)
//					Destroy(i);
//				lineList.Clear();
//			}
//			if (nbWave < nbWavesByRounds)
//				LaunchWave();
//			else
//			{
//				nbWave = 0;
//				state = ISWAITING;
//				MineralResources.nbResources += 50;
//				currentRound = (currentRound + 1) % rounds.Length;
//				if (currentRound == 0)
//				{
//					++nbWavesByRounds;
//					++level;
//				}
//				nbDirections = rounds[currentRound] + level;
//				if (!Sun.isDead)
//					PrepareWaves();
//			}
//		}
//	}
//}
