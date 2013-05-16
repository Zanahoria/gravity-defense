#pragma strict

public static var asteroidTab = List.<GameObject>();
public static var scriptName = "";

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
	var name : String = "";
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
	var round = new Round();
	return round;
}

function Start()
{
	roundId = 0;
	nbWave = 0;
	setState(ISLOADING);
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
	this.gameObject.AddComponent(scriptName);
	//this.gameObject.GetComponent(AsteroidSettings).DIST_DESPAWN = 40;
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

static function DestructAsteroid(asteroid : GameObject) // when asteroid is destructed by player
{
	++StatInfos.nbAsteroidDestroyed;
	var settings : AsteroidSettings = asteroid.gameObject.GetComponent(AsteroidSettings);
	if (settings)
		MineralResources.nbResources += settings.nbResourcesEarned;
	RemoveAsteroid(asteroid);
}

static function RemoveAsteroid(asteroid : GameObject) // when asteroid is removed
{
	for (var i = 0; i < asteroidTab.Count; ++i)
	{
		if (asteroidTab[i].transform.GetInstanceID() == asteroid.transform.GetInstanceID())
		{
			asteroidTab.RemoveAt(i);
			break;
		}
	}
	--nbEnemies;
	Destroy(asteroid);
}

static function RemoveAsteroids()
{
	while (asteroidTab.Count)
	{
		Destroy(asteroidTab[0].gameObject);
		asteroidTab.RemoveAt(0);
	}
}
static function setState(newState : int)
{
	if (newState == ISROUNDING)
		RemoveLines();
	state = newState;
}

function Update ()
{
	if (Sun.isDead)
	{
		RemoveLines();
		RemoveAsteroids();
		return ;
	}
	if (roundId >= rounds.Count)
		return ;
	if (state == ISWAITING && !lineList.Count)
		PrepareWaves();
	else if (state == ISROUNDING)
	{
		if (nbEnemies == 0)
		{
			if (nbWave < rounds[roundId].waves.Count)
				LaunchWave();
			else
			{
				nbWave = 0;
				MineralResources.nbResources += rounds[roundId].moneyEarned;
				if (roundId + 1 < rounds.Count)
				{
					++roundId;
					if (!Sun.isDead)
						PrepareWaves();
					setState(ISWAITING);
				}
				else
					setState(ISFINISHED);
			}
		}
	}
}

static function instantiateAsteroid(object : GameObject, position : Vector3)
{
	var asteroid = Instantiate(object, position, Quaternion.identity);
	asteroidTab.Add(asteroid.gameObject);
	++nbEnemies;
	return asteroid;
}

static function instantiateAsteroid(direction : Direction, position : Vector3)
{
	var asteroid = instantiateAsteroid(asteroidTypes[direction.asteroidType], position);
	var life = asteroid.GetComponent(Life);
	life.maxLife = direction.asteroidLife;
	life.currentLife = direction.asteroidLife;
	asteroid.GetComponent(AsteroidSettings).nbResourcesEarned = direction.moneyEarned;
	asteroid.GetComponent(Gravity).attractCoef *= direction.attractCoef;
	asteroid.transform.localScale *= direction.asteroidScale;
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
		}
	}
	++nbWave;
}

static function Load()
{
	setState(ISWAITING);
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
				asteroid.transform.position = Vector3((25 + asteroid.transform.localScale.x) * Mathf.Cos(angle), 0, (25 + asteroid.transform.localScale.x) * Mathf.Sin(angle));
				asteroid.rigidbody.velocity = Vector3.zero;
				asteroid.GetComponent(Gravity).enabled = false;
				asteroid.rigidbody.detectCollisions = false;
				var display = asteroid.AddComponent(DisplayMessage);
				display.message = "x" + direction.asteroidNb;
				asteroidInfos.Add(asteroid);
			}
		}
	}
}

static function RemoveLines()
{
	while (lineList.Count)
	{
		Destroy(lineList[0].gameObject);
		lineList.RemoveAt(0);
	}
	while (asteroidInfos.Count)
	{
		RemoveAsteroid(asteroidInfos[0].gameObject);
		asteroidInfos.RemoveAt(0);
	}
}
