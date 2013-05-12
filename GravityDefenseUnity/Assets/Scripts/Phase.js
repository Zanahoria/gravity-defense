#pragma strict

static private var oldInPhase = 0;

function Start () {
	oldInPhase = LevelDescriptor.state;
}

function Update () {
	if (LevelDescriptor.state != oldInPhase)
	{
		oldInPhase = LevelDescriptor.state;
		if (LevelDescriptor.state == LevelDescriptor.ISWAITING)
		{
			if (!Sun.isDead)
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
		i.gameObject.GetComponent(PickingOrbit).enabled = true;
		var planets = i.gameObject.GetComponent(PickingOrbit).planetTab;
		for (var j : PlanetDragNDrop in planets) {
			if (j)
				j.gameObject.GetComponent(PlanetDragNDrop).enabled = true;
		}
	}
}
