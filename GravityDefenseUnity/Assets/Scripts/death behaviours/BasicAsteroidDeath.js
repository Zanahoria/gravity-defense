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
			Destroy(this.gameObject);
		}
}