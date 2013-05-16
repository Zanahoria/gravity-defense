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

			var settings : AsteroidSettings = this.gameObject.GetComponent(AsteroidSettings);
			MineralResources.nbResources += settings.nbResourcesEarned;
			LevelDescriptor.RemoveAsteroid(this.gameObject);
		}
}