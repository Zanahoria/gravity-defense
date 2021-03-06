#pragma strict

public var laserLine : GameObject;
public var laserExplosion : GameObject;
public var activated : boolean = false;
public var LASER_RANGE : int = 5;
public var RATE_OF_FIRE : float = 0.6; //time between shot in seconds
public var DAMAGE : int = 2;
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
		var linerd : LineRenderer = line.GetComponent(LineRenderer);
		linerd.SetPosition(0, object1.transform.position);
		linerd.SetPosition(1, object2.transform.position);
	}
	if (laserExplosion)
	    Instantiate(laserExplosion, object2.transform.position, Quaternion.identity);
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
					break;
    			}
    		}
    	}
    	if (lastHit)
    	{
			fire(this.gameObject, lastHit.gameObject);
			TimeSinceLast = Time.timeSinceLevelLoad;
			lastHit.GetComponent(Life).AddRemoveLife(-DAMAGE);
		}
	}
}