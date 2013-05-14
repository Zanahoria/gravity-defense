#pragma strict

public var activated : int = 0;
public static var LASER_RANGE : int = 5;
public static var RATE_OF_FIRE : float = 1; //time between shot
public static var DAMAGE : int = 0;
private var lastHit : GameObject = null;
private var TimeSinceLast : float = RATE_OF_FIRE;

function Start () {
	lastHit = null;
}

function Update () {
	if (activated && TimeSinceLast >= RATE_OF_FIRE)
	{
		var LaserPos = gameObject.transform.position;
		if (lastHit)
		{
				if ((Vector3.Distance(LaserPos, lastHit.gameObject.transform.position)) < LASER_RANGE)
				{
					lastHit.GetComponent(Life).currentLife -= 1;
    			}
		}
		else
		{
			var asteroids = LevelDescriptor.asteroidTab;
    		for (var i : GameObject in asteroids)
    		{
    			var dist = Vector3.Distance(LaserPos, i.gameObject.transform.position);
				if (dist < LASER_RANGE)
				{
					lastHit = i;
					lastHit.GetComponent(Life).currentLife -= 1;
    			}
    		}
    	}
    	TimeSinceLast = Time.timeSinceLevelLoad;
	}
}