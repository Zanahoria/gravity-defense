#pragma strict

public static var asteroidTab = List.<GameObject>();

class Direction
{
	var angle : float = 0.0;
	var accuracy : float = 0.05;
	var asteroidNb : int = 5;
	var asteroidType : String = "basic";
	var asteroidLife : int = 4;
	var moneyEarned : int = 5;
	var attractCoef : float = 1.0;
	var delay : float = 0.0;
	var asteroidScale : float = 1.0;
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

public var lineObject : GameObject;

public static var asteroidTypes = new Dictionary.<String, GameObject>();
public static var ISLOADING : int = 0;
public static var ISWAITING : int = 1;
public static var ISROUNDING : int = 2;
public static var ISFINISHED : int = 3;

static public var state : int = ISLOADING;

static public var nbEnemies = 0;
static public var roundId = 0;

static public var levelName : String;
static public var levelDescription : String;

static public var rounds = List.<Round>();

static private var lineList = List.<GameObject>();
static private var asteroidInfos = List.<GameObject>();
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
	state = ISLOADING;
	nbEnemies = 0;
	clearRounds();
	for (var asteroid in asteroidTab)
	{
		if (asteroid == null)
		{
			asteroidTab.Clear();
			break;
		}
	}
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

static function RemoveAsteroid(asteroid : GameObject)
{
	for (var i = 0; i < asteroidTab.Count; ++i)
	{
		if (asteroidTab[i].transform.GetInstanceID() == asteroid.transform.GetInstanceID())
		{
			asteroidTab.RemoveAt(i);
			break;
		}
	}
	Destroy(asteroid);
}

function Update ()
{
	if (roundId >= rounds.Count)
		return ;
	if (state == ISWAITING && !lineList.Count)
		PrepareWaves();
	else if (state == ISROUNDING)
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
				MineralResources.nbResources += rounds[roundId].moneyEarned;
				++roundId;
				if (!Sun.isDead)
					PrepareWaves();
				if (roundId < rounds.Count)
					state = ISWAITING;
				else
					state = ISFINISHED;
			}
		}
	}
}

function instantiateAsteroid(direction : Direction, position : Vector3)
{
	var asteroid = Instantiate(asteroidTypes[direction.asteroidType], position, Quaternion.identity);
	var life = asteroid.GetComponent(Life);
	life.maxLife = direction.asteroidLife;
	life.currentLife = direction.asteroidLife;
	asteroid.GetComponent(AsteroidSettings).nbResourcesEarned = direction.moneyEarned;
	asteroid.GetComponent(Gravity).attractCoef *= direction.attractCoef;
	asteroid.transform.localScale *= direction.asteroidScale;
	asteroidTab.Add(asteroid);
	return asteroid;
}

function LaunchWave()
{
	for (var direction in rounds[roundId].waves[nbWave].directions)
	{
		for (var j : int = 0; j < direction.asteroidNb; ++j)
		{
			var addAngle : float = Random.value * direction.accuracy - direction.accuracy / 2.0;
			var asteroid = instantiateAsteroid(direction, Vector3((40.0 + j) * Mathf.Cos(direction.angle + addAngle), 0,
			(40.0 + j) * Mathf.Sin(direction.angle + addAngle)));
			asteroid.transform.position = Vector3((40.0 + j * (asteroid.transform.localScale.x * 2 + 1.0)) * Mathf.Cos(direction.angle + addAngle), 0,
			(40.0 + j * (asteroid.transform.localScale.x * 2 + 1.0)) * Mathf.Sin(direction.angle + addAngle));
			++nbEnemies;
		}
	}
	++nbWave;
}

static function Load()
{
	state = ISWAITING;
}

function PrepareWaves()
{
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
				
				var asteroid = instantiateAsteroid(direction, Vector3(25 * Mathf.Cos(angle), 0, 25 * Mathf.Sin(angle)));
				asteroid.rigidbody.velocity = Vector3.zero;
				asteroid.GetComponent(Gravity).enabled = false;
				var display = asteroid.AddComponent(DisplayMessage);
				display.message = "x" + direction.asteroidNb;
				asteroidInfos.Add(asteroid);
			}
		}
	}
}

function RemoveLines()
{
	for (var i : GameObject in lineList)
		Destroy(i);
	lineList.Clear();

	for (var i : GameObject in asteroidInfos)
		Destroy(i);
	asteroidTab.Clear();
	asteroidInfos.Clear();
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
