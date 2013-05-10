#pragma strict

static private var oldInPhase = 0;

function Start () {
	AsteroidSpawner.state = AsteroidSpawner.ISWAITING;
	oldInPhase = AsteroidSpawner.ISWAITING;
}

function Update () {
	if (AsteroidSpawner.state != oldInPhase)
	{
		oldInPhase = AsteroidSpawner.state;
		if (AsteroidSpawner.state == AsteroidSpawner.ISWAITING)
		{
			if (Sun.isDead)
			{
				MineralResources.nbResources = 100;
				Application.LoadLevel("gravitydefense");
			}
			else
				EnableControls();
		}
		else
			DisableControls();
	}
}

static function DisableControls() {
	var orbit = PickingOrbit.orbitTab;
	for (var i : PickingOrbit in orbit)
	{
		if (!i) continue;
		i.gameObject.GetComponent(PickingOrbit).enabled = false;
		var planets = i.gameObject.GetComponent(PickingOrbit).planetTab;
		for (var j : PlanetDragNDrop in planets) {
			if (j)
				j.gameObject.GetComponent(PlanetDragNDrop).enabled = false;
		}
	}
}

static function EnableControls() {
	var orbit = PickingOrbit.orbitTab;
	for (var i : PickingOrbit in orbit)
	{
		if (!i) continue;
		i.gameObject.GetComponent(PickingOrbit).enabled = true;
		var planets = i.gameObject.GetComponent(PickingOrbit).planetTab;
		for (var j : PlanetDragNDrop in planets) {
			if (j)
				j.gameObject.GetComponent(PlanetDragNDrop).enabled = true;
		}
	}
}
