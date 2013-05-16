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
		
		if (this.GetComponent(Life).maxLife > 1 )
		{
			var decalVec : Vector3 = calcDecalVec();
			var newAsteroid1 = Instantiate(this, this.transform.position + decalVec * (this.transform.localScale.x / 2.0 + 0.1), Quaternion.identity);
			newAsteroid1.transform.localScale = this.transform.localScale / 2.0;
			newAsteroid1.rigidbody.velocity = this.rigidbody.velocity + (decalVec * 2.0);
			newAsteroid1.GetComponent(Life).maxLife = this.GetComponent(Life).maxLife / 2;
			newAsteroid1.GetComponent(Life).currentLife = newAsteroid1.GetComponent(Life).maxLife;
			newAsteroid1.GetComponent(AsteroidSettings).nbResourcesEarned = this.GetComponent(AsteroidSettings).nbResourcesEarned;
			newAsteroid1.GetComponent(Gravity).attractCoef = this.GetComponent(Gravity).attractCoef;
			++LevelDescriptor.nbEnemies;
			LevelDescriptor.asteroidTab.Add(newAsteroid1.gameObject);
			
			var newAsteroid2 = Instantiate(this, this.transform.position - decalVec * (this.transform.localScale.x / 2.0 + 0.1), Quaternion.identity);
			newAsteroid2.transform.localScale = this.transform.localScale / 2.0;
			newAsteroid2.rigidbody.velocity = this.rigidbody.velocity - (decalVec * 2.0);
			newAsteroid2.GetComponent(Life).maxLife = this.GetComponent(Life).maxLife / 2;
			newAsteroid2.GetComponent(Life).currentLife = newAsteroid2.GetComponent(Life).maxLife;
			newAsteroid2.GetComponent(AsteroidSettings).nbResourcesEarned = this.GetComponent(AsteroidSettings).nbResourcesEarned;
			newAsteroid2.GetComponent(Gravity).attractCoef = this.GetComponent(Gravity).attractCoef;
			++LevelDescriptor.nbEnemies;
			LevelDescriptor.asteroidTab.Add(newAsteroid2.gameObject);
		}
		LevelDescriptor.RemoveAsteroid(this.gameObject);
	}
}

function calcDecalVec()
{
	var rotation = Quaternion.Euler(0, 90, 0);
	var result : Vector3 = rotation * this.rigidbody.velocity;
	result.Normalize();
	return result;
}
