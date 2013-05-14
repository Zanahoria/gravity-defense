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
		
		if (this.GetComponent(Life).maxLife > 1 )
		{
			
			var newAsteroid1 = Instantiate(LevelDescriptor.asteroidTypes["basic"], this.transform.position + Vector3(2, 0, 0), Quaternion.identity);
			newAsteroid1.GetComponent(Life).maxLife = this.GetComponent(Life).maxLife / 2;
			newAsteroid1.GetComponent(Life).currentLife = newAsteroid1.GetComponent(Life).maxLife;
			newAsteroid1.GetComponent(AsteroidSettings).nbResourcesEarned = this.GetComponent(AsteroidSettings).nbResourcesEarned;
			newAsteroid1.GetComponent(Gravity).attractCoef = this.GetComponent(Gravity).attractCoef;
			++LevelDescriptor.nbEnemies;
			LevelDescriptor.asteroidTab.Add(newAsteroid1);
			
			var newAsteroid2 = Instantiate(LevelDescriptor.asteroidTypes["basic"], this.transform.position - Vector3(2, 0, 0), Quaternion.identity);
			newAsteroid2.GetComponent(Life).maxLife = this.GetComponent(Life).maxLife / 2;
			newAsteroid2.GetComponent(Life).currentLife = newAsteroid2.GetComponent(Life).maxLife;
			newAsteroid2.GetComponent(AsteroidSettings).nbResourcesEarned = this.GetComponent(AsteroidSettings).nbResourcesEarned;
			newAsteroid2.GetComponent(Gravity).attractCoef = this.GetComponent(Gravity).attractCoef;
			++LevelDescriptor.nbEnemies;
			LevelDescriptor.asteroidTab.Add(newAsteroid2);
		}
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