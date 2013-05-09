#pragma strict

static var inPhase = 0;
static private var oldInPhase = 0;

function Start () {
	inPhase = 0;
	oldInPhase = 0;
}

function Update () {
	if (inPhase != oldInPhase)
	{
		oldInPhase = inPhase;
		if (inPhase == 0)
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

function OnGUI ()
{
	if (inPhase == 0)
	{
		if (GUI.Button(Rect (10,70,90,50), "Next wave !")) 
		{
			inPhase = 1;
			AsteroidSpawner.state = AsteroidSpawner.ISROUNDING;
    	}
	}
}