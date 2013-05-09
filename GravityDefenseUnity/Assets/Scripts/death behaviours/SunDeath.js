#pragma strict

private var life : Life;

function Start () {
	life = this.gameObject.GetComponent(Life);
}

function Update () {
	if (life.currentLife == 0)
		{
			Sun.isDead = true;
			Destroy(this.gameObject);
		}
}