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
<<<<<<< HEAD
			var newAsteroid1 = Instantiate(this, this.transform.position + Vector3(0.5, 0, 0), Quaternion.identity);
=======
			var decalVec : Vector3 = calcDecalVec();
			var newAsteroid1 = Instantiate(this, this.transform.position + decalVec * (this.transform.localScale.x / 2.0 + 0.1), Quaternion.identity);
			newAsteroid1.transform.localScale = this.transform.localScale / 2.0;
			newAsteroid1.rigidbody.velocity = this.rigidbody.velocity + decalVec * 0.5;
>>>>>>> dedfa6cd4744803cd1c2be1b90f21c17dbe09cec
			newAsteroid1.GetComponent(Life).maxLife = this.GetComponent(Life).maxLife / 2;
			newAsteroid1.GetComponent(Life).currentLife = newAsteroid1.GetComponent(Life).maxLife;
			newAsteroid1.GetComponent(AsteroidSettings).nbResourcesEarned = this.GetComponent(AsteroidSettings).nbResourcesEarned;
			newAsteroid1.GetComponent(Gravity).attractCoef = this.GetComponent(Gravity).attractCoef;
			newAsteroid1.rigidbody.velocity = this.rigidbody.velocity;
			++LevelDescriptor.nbEnemies;
			LevelDescriptor.asteroidTab.Add(newAsteroid1.gameObject);
			
<<<<<<< HEAD
			var newAsteroid2 = Instantiate(this, this.transform.position - Vector3(0.5, 0, 0), Quaternion.identity);
=======
			var newAsteroid2 = Instantiate(this, this.transform.position - decalVec * (this.transform.localScale.x / 2.0 + 0.1), Quaternion.identity);
			newAsteroid2.transform.localScale = this.transform.localScale / 2.0;
			newAsteroid2.rigidbody.velocity = this.rigidbody.velocity - decalVec * 0.5;
>>>>>>> dedfa6cd4744803cd1c2be1b90f21c17dbe09cec
			newAsteroid2.GetComponent(Life).maxLife = this.GetComponent(Life).maxLife / 2;
			newAsteroid2.GetComponent(Life).currentLife = newAsteroid2.GetComponent(Life).maxLife;
			newAsteroid2.GetComponent(AsteroidSettings).nbResourcesEarned = this.GetComponent(AsteroidSettings).nbResourcesEarned;
			newAsteroid2.GetComponent(Gravity).attractCoef = this.GetComponent(Gravity).attractCoef;
			newAsteroid2.rigidbody.velocity = this.rigidbody.velocity;
			++LevelDescriptor.nbEnemies;
			LevelDescriptor.asteroidTab.Add(newAsteroid2.gameObject);
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

function calcDecalVec()
{
	var rotation = Quaternion.Euler(0, 90, 0);
	var result : Vector3 = rotation * this.rigidbody.velocity;
	result.Normalize();
	return result;
}
