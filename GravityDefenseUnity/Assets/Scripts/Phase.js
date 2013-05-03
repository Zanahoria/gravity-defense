#pragma strict

static var inPhase = 0;

function Start () {
	inPhase = 0;
	//disable spawn script
}

function Update () {
}

static function DisableControls() {
	inPhase = 1;
	var orbit = pickingorbit.orbitTab;
	for (var i : pickingorbit in orbit)
	{
		if (!i) continue;
		i.gameObject.GetComponent(pickingorbit).enabled = false;
		var planets = i.gameObject.GetComponent(pickingorbit).planetTab;
		for (var j : dragndrop in planets) {
			if (j)
				j.gameObject.GetComponent(dragndrop).enabled = false;
		}
	}
}

static function EnableControls() {
	inPhase = 0;
	var orbit = pickingorbit.orbitTab;
	for (var i : pickingorbit in orbit)
	{
		if (!i) continue;
		i.gameObject.GetComponent(pickingorbit).enabled = true;
		var planets = i.gameObject.GetComponent(pickingorbit).planetTab;
		for (var j : dragndrop in planets) {
			if (j)
				j.gameObject.GetComponent(dragndrop).enabled = true;
		}
	}
}

function OnGUI ()
{
	if (inPhase == 0)
	{
		if (GUI.Button(Rect (10,70,90,50), "Next wave !")) 
		{
			DisableControls();
			asteroidSpawner.state = asteroidSpawner.ISROUNDING;
    	}
	}
}