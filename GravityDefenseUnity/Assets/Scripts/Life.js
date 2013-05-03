#pragma strict

public var maxHealth : int;
public var cost : int = 0;
public var onDestroyValue : int = 0;
public var explosionPrefab : Transform;
public var gui : IngameGUI;
public var health : int;
public var displayLife : boolean = false;

private var hasTakenDamage : boolean = false;

function TakeDamage(dmg : int) {
	health -= dmg;
	hasTakenDamage = true;
	if (health <= 0) {
		if (explosionPrefab)
			Instantiate(explosionPrefab, transform.position, Quaternion.identity);
		if (gui)
			gui.AddResource(onDestroyValue);
		if (gameObject.GetComponent(Sun)) {
			Application.LoadLevel("gravitydefender");
		}
		Destroy(gameObject);
	}
}

function GetHealth() {
	return health;
}

function Start () {
	health = maxHealth;
}

function Update () {
	if (displayLife && hasTakenDamage) {
		hasTakenDamage = false;
		var halo = gameObject.GetComponent(ParticleSystem);
		var ratio : float = health;
		ratio /= maxHealth;
		halo.particleSystem.startColor = Color(1.0f - ratio, ratio + (1.0f - ratio) * 0.5f, (1.0f - ratio));
	}
	//life.transform.position = camera.WorldToScreenPoint(this.transform.position);;
	//life.transform.position = Vector2(0, 0);
}