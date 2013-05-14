#pragma strict

public var activated : int = 0;
public static var LASER_RANGE : int = 5;
public static var RATE_OF_FIRE : float = 0.6; //time between shot in seconds
public static var DAMAGE : int = 1;
private var lastHit : GameObject = null;
private var TimeSinceLast : float = RATE_OF_FIRE;

function Start () {
	lastHit = null;
}

function Update () {
	if (activated && ((Time.timeSinceLevelLoad - TimeSinceLast) >= RATE_OF_FIRE) && LevelDescriptor.state == LevelDescriptor.ISROUNDING)
	{
		var LaserPos = gameObject.transform.position;
		if (lastHit)
		{
				if ((Vector3.Distance(LaserPos, lastHit.gameObject.transform.position)) < LASER_RANGE)
				{
					Debug.Log("piou again");
					Debug.Log(Time.timeSinceLevelLoad);
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
					Debug.Log("piou piou");
					Debug.Log(Time.timeSinceLevelLoad);
					lastHit = i;
					lastHit.GetComponent(Life).currentLife -= DAMAGE;
					break;
    			}
    		}
    	}
    	TimeSinceLast = Time.timeSinceLevelLoad;
	}
}