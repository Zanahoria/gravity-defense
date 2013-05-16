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

		if (this.GetComponent(Life).maxLife > 1 )
		{
			var decalVec : Vector3 = calcDecalVec();
			var newAsteroid1 = LevelDescriptor.instantiateAsteroid(this.gameObject, this.transform.position + decalVec * (this.transform.localScale.x / 2.0 + 0.1));
			newAsteroid1.transform.localScale = this.transform.localScale / 2.0;
			newAsteroid1.rigidbody.velocity = this.rigidbody.velocity + (decalVec * 2.0);
			newAsteroid1.GetComponent(Life).maxLife = this.GetComponent(Life).maxLife / 2;
			newAsteroid1.GetComponent(Life).currentLife = newAsteroid1.GetComponent(Life).maxLife;
			newAsteroid1.GetComponent(AsteroidSettings).nbResourcesEarned = this.GetComponent(AsteroidSettings).nbResourcesEarned;
			newAsteroid1.GetComponent(Gravity).attractCoef = this.GetComponent(Gravity).attractCoef;
			
			var newAsteroid2 = LevelDescriptor.instantiateAsteroid(this.gameObject, this.transform.position - decalVec * (this.transform.localScale.x / 2.0 + 0.1));
			newAsteroid2.transform.localScale = this.transform.localScale / 2.0;
			newAsteroid2.rigidbody.velocity = this.rigidbody.velocity - (decalVec * 2.0);
			newAsteroid2.GetComponent(Life).maxLife = this.GetComponent(Life).maxLife / 2;
			newAsteroid2.GetComponent(Life).currentLife = newAsteroid2.GetComponent(Life).maxLife;
			newAsteroid2.GetComponent(AsteroidSettings).nbResourcesEarned = this.GetComponent(AsteroidSettings).nbResourcesEarned;
			newAsteroid2.GetComponent(Gravity).attractCoef = this.GetComponent(Gravity).attractCoef;
		}
		LevelDescriptor.DestructAsteroid(this.gameObject);
	}
}

function calcDecalVec()
{
	var rotation = Quaternion.Euler(0, 90, 0);
	var result : Vector3 = rotation * this.rigidbody.velocity;
	result.Normalize();
	return result;
}
