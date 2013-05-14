#pragma strict

public var initialVelocity : float = 0;
public var nbResourcesEarned : int = 5;

private var duration : float = 5;
private var spawnTime : float = 0;

function Awake()
{
	var pos = this.transform.position;
	rigidbody.velocity = transform.TransformDirection((-pos * initialVelocity) / pos.magnitude);
	rigidbody.angularVelocity = Vector3(Random.Range(-4, 4), Random.Range(-4, 4), Random.Range(-4, 4));

	spawnTime = Time.timeSinceLevelLoad;
}

function Start () {

}

function Update () {
	if (transform.position.magnitude > 35 && Time.timeSinceLevelLoad > spawnTime + duration)
	{
		--LevelDescriptor.nbEnemies;
		var asteroidTab = LevelDescriptor.asteroidTab;
		for (var i = 0; i < asteroidTab.Count; ++i)
			{
				if (asteroidTab[i].transform.GetInstanceID() == this.transform.GetInstanceID())
				{
					asteroidTab.RemoveAt(i);
					break;
				}
			}
		Destroy(gameObject);
	}
}