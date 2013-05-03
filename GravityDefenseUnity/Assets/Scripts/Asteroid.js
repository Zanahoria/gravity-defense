#pragma strict

public var explosionPrefab : Transform;
private var duration : float = 5;
var initialVelocity : float;
private var spawnTime : float = 0;

function Awake()
{
	var pos = this.transform.position;
	spawnTime = Time.timeSinceLevelLoad;
	rigidbody.velocity = transform.TransformDirection((-pos * initialVelocity) / pos.magnitude);
	rigidbody.angularVelocity = Vector3(Random.Range(-10, 10), Random.Range(-10, 10), Random.Range(-10, 10));
}

function OnCollisionEnter(collision : Collision) {
	var pos : Vector3 = collision.contacts[0].point;
    Instantiate(explosionPrefab, pos, Quaternion.identity);
    var target = collision.gameObject.GetComponent(Life);
    var previousHP = target.GetHealth();
    var myLife = gameObject.GetComponent(Life);
    if (myLife.health <= previousHP)
		--asteroidSpawner.nbEnemies;
    target.TakeDamage(myLife.GetHealth());
    myLife.TakeDamage(previousHP);
}

function Start () {
}

function Update () {
	 if (transform.position.magnitude > 35 && Time.timeSinceLevelLoad > spawnTime + duration) {
		--asteroidSpawner.nbEnemies;
		Destroy(gameObject);
	}
}