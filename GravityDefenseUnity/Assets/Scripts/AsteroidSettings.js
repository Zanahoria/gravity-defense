#pragma strict

public var initialVelocity : float = 0;
public var nbResourcesEarned : int = 5;
public var DIST_DESPAWN = 35;

private var isComing;

function Awake()
{
	var pos = this.transform.position;
	rigidbody.velocity = transform.TransformDirection((-pos * initialVelocity) / pos.magnitude);
	rigidbody.angularVelocity = Vector3(Random.Range(-4, 4), Random.Range(-4, 4), Random.Range(-4, 4));
}

function Start () {
	isComing = true;
}

function Update () {
	if (transform.position.magnitude < 35)
	{
		if (isComing)
			isComing = false;
	}
	else
	{
		if (!isComing)
		{
			--LevelDescriptor.nbEnemies;
			LevelDescriptor.RemoveAsteroid(this.gameObject);
		}
	}
}