#pragma strict

private var life : Life;

function Start () {
	life = this.gameObject.GetComponent(Life);
}

function Update () {
	if (life.currentLife == 0)
		{
			var settings : AsteroidSettings = this.gameObject.GetComponent(AsteroidSettings);
			MineralResources.nbResources += settings.nbResourcesEarned;
			--AsteroidSpawner.nbEnemies;
			Destroy(this.gameObject);
		}
}