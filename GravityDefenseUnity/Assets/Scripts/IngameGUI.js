#pragma strict

static var selectedPlanet = 0;
static var speed = 1;
static var gold = 100;
public var sun : Life;

function Start () {
 selectedPlanet = 0;
 gold = 100;
}

function AddResource(g : int) {
	gold += g;
}

function RemoveResource(g : int) {
	if (g > gold) {
		return false;
	}	
	gold -= g;
	return true;
}

function Update () {
    if (Input.GetKeyDown("1")) 
    {
    	selectedPlanet = 0;
    }
    if (Input.GetKeyDown("2")) 
    {
    	selectedPlanet = 1;
    }
    if (Input.GetKeyDown(UnityEngine.KeyCode.Escape))
    {
    	Application.Quit();
    }
}

function OnGUI ()
{
	if (selectedPlanet == 0){
		if (GUI.Button(Rect (10, 10, 90, 50), "Switch to \nPush Planet")) 
			selectedPlanet = 1;
	}
	else {
		if (GUI.Button (Rect (10, 10, 90, 50), "Switch to \nPull planet")) 
			selectedPlanet = 0;
	}
	if (speed == 1) {
		if (GUI.Button(Rect (10, 130, 90, 50), "Speed x4")) {
			speed = 4;
			Time.timeScale = 4;
		}
	}
	else {
		if (GUI.Button(Rect (10, 130, 90, 50), "Speed x1")) {
			speed = 1;
			Time.timeScale = 1;
		}
	}
	GUI.Label(Rect (110, 10, 100, 50), "Resources: " + gold);
	GUI.Label(Rect (110, 30, 100, 50), "Sun: " + sun.health + "HP");

	
//	var orbit = pickingorbit.orbitTab;
//    for (var i : pickingorbit in orbit)
//    {
//    	var planets = i.planetTab;
//       	for (var j : dragndrop in planets) {
//       		if (j) {
//       			var life = j.gameObject.GetComponent(Life).health;
//       			var txt = life.ToString();
//      			GUI.Label (Rect (camera.WorldToScreenPoint(j.transform.position).x - 5, camera.WorldToScreenPoint(-j.transform.position).y - 30, 30, 40), txt);
//      		}
//      	}
//    }
}
