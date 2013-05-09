#pragma strict

function Start () {

}

function Update () {
	var halo = gameObject.GetComponent(ParticleSystem);
	var life = gameObject.GetComponent(Life);
	var ratio : float = life.currentLife;
	ratio /= life.maxLife;
	halo.particleSystem.startColor = Color(1.0f - ratio, ratio + (1.0f - ratio) * 0.5f, (1.0f - ratio));
}