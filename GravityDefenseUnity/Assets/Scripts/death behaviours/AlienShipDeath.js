#pragma strict

public var explosionPrefab : Transform = null;

private var life : Life;

function Start () {
	life = this.gameObject.GetComponent(Life);
}

function Update () {
	if (life.currentLife == 0)
		{
			if (explosionPrefab)
			    Instantiate(explosionPrefab, this.transform.position, Quaternion.identity);

			LevelDescriptor.DestructAsteroid(this.gameObject);
		}
}