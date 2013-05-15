#pragma strict

public var laserLine : GameObject;
public var laserExplosion : GameObject;
public var activated : int = 0;
public static var LASER_RANGE : int = 5;
public static var RATE_OF_FIRE : float = 0.6; //time between shot in seconds
public static var DAMAGE : int = 1;
private var lastHit : GameObject = null;
private var TimeSinceLast : float = RATE_OF_FIRE;

function Start () {
	lastHit = null;
}

function fire(object1 : GameObject, object2 : GameObject)
{
	if (laserLine)
	{
		var line : GameObject = Instantiate(laserLine, Vector3(0, 0, 0), Quaternion.identity);
		line.GetComponent(LaserFollowTargets).target1 = object1;
		line.GetComponent(LaserFollowTargets).target2 = object2;
	}
	if (laserExplosion)
	    Instantiate(laserExplosion, object2.transform.position, Quaternion.identity);
}

function Update () {
	if (activated && ((Time.timeSinceLevelLoad - TimeSinceLast) >= RATE_OF_FIRE) && LevelDescriptor.state == LevelDescriptor.ISROUNDING)
	{
		var LaserPos = gameObject.transform.position;
		if (lastHit)
		{
				if ((Vector3.Distance(LaserPos, lastHit.gameObject.transform.position)) < LASER_RANGE)
				{
					lastHit.GetComponent(Life).currentLife -= 1;
					fire(this.gameObject, lastHit.gameObject);
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
					lastHit.GetComponent(Life).currentLife -= DAMAGE;
					fire(this.gameObject, i.gameObject);
					break;
    			}
    		}
    	}
    	TimeSinceLast = Time.timeSinceLevelLoad;
	}
}