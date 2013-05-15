#pragma strict

public var activated : boolean = false;
public var LASER_RANGE : int = 5;
public var RATE_OF_FIRE : float = 0.6; //time between shot in seconds
public var DAMAGE : int = 2z;
private var lastHit : GameObject = null;
private var TimeSinceLast : float = RATE_OF_FIRE;

function Start () {
	lastHit = null;
}

function Update () {
	if (activated && ((Time.timeSinceLevelLoad - TimeSinceLast) >= RATE_OF_FIRE) && LevelDescriptor.state == LevelDescriptor.ISROUNDING)
	{
		var LaserPos = gameObject.transform.position;
		if (!lastHit || ((Vector3.Distance(LaserPos, lastHit.gameObject.transform.position)) > LASER_RANGE))
		{
			var asteroids = LevelDescriptor.asteroidTab;
    		for (var i : GameObject in asteroids)
    		{
    			var dist = Vector3.Distance(LaserPos, i.gameObject.transform.position);
				if (dist < LASER_RANGE)
				{
					lastHit = i;
					Debug.Log("nouveau last hit");
					break;
    			}
    		}
    	}
    	if (lastHit)
    	{
	   	lastHit.GetComponent(Life).currentLife -= DAMAGE;
	   	TimeSinceLast = Time.timeSinceLevelLoad;
		}
	}
}