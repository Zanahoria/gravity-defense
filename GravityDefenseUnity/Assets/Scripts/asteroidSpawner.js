#pragma strict

public var asteroid : Gravity;
public var lineObject : GameObject;

public static var ISWAITING : int = 0;
public static var ISROUNDING : int = 1;

public var attractCoef : float = 1.0;
public var nbEnnemiesByWaves : int = 5;
public var nbDirections : int = 1;
public var nbWavesByRounds : int = 2;
static public var state : int = ISWAITING;

static public var nbEnemies = 0;

private var nbWave = 0;
private var directionList = List.<float>();
private var lineList = List.<GameObject>();
private var currentRound : int = 0;

private var level : int = 0;

private var rounds : int[] = [1, 1, 2, 3];

function Start ()
{
	state = ISWAITING;
	nbEnemies = 0;
	nbDirections = rounds[currentRound] + level;
	PrepareWaves();
}

function PrepareWaves()
{
	for (var k : int = 0; k < nbWavesByRounds; ++k)
	{
		for (var i : int = 0; i < nbDirections; ++i)
		{
			var angle : float = Random.value * 3.14 * 2.0;
			directionList.Add(angle);

			var line : GameObject = Instantiate(lineObject, Vector3(), Quaternion.identity);
			var linerd : LineRenderer = line.GetComponent(LineRenderer);
			linerd.SetPosition(0, Vector3(4 * Mathf.Cos(angle), 0, 4 * Mathf.Sin(angle)));
			linerd.SetPosition(1, Vector3(50 * Mathf.Cos(angle), 0, 50 * Mathf.Sin(angle)));
			lineList.Add(line);
		}
	}
}

function LaunchWave()
{
	for (var i : int = 0; i < nbDirections; ++i)
	{
		var direction = directionList[0];
		directionList.RemoveAt(0);
		for (var j : int = 0; j < nbEnnemiesByWaves; ++j)
		{
			var addAngle = Random.value * 0.05 - 0.025;
			var asteroid : Gravity = Instantiate(asteroid, Vector3((40 + j) * Mathf.Cos(direction + addAngle), 0,
			(40 + j) * Mathf.Sin(direction + addAngle)), Quaternion.identity);
			asteroid.attractCoef = attractCoef;
			++nbEnemies;
		}
	}
	++nbWave;
}

function Update ()
{
	if (state == ISROUNDING)
	{
		if (nbEnemies == 0)
		{
			if (nbWave == 0)
			{
				for (var i : GameObject in lineList)
					Destroy(i);
				lineList.Clear();
			}
			if (nbWave < nbWavesByRounds)
				LaunchWave();
			else
			{
				nbWave = 0;
				state = ISWAITING;
				MineralResources.nbResources += 50;
				currentRound = (currentRound + 1) % rounds.Length;
				if (currentRound == 0)
				{
					++nbWavesByRounds;
					++level;
				}
				nbDirections = rounds[currentRound] + level;
				PrepareWaves();
				
				// launch the preparation phase
				Phase.inPhase = 0;
			}
		}
	}
}
