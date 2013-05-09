#pragma strict

static var speed = 1;

function Start () {
}

function Update () {
    if (Input.GetKeyDown(UnityEngine.KeyCode.Escape))
    {
    	Application.Quit();
    }
}

function OnGUI ()
{
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
	GUI.Label(Rect (110, 10, 100, 50), "Resources: " + MineralResources.nbResources);
	GUI.Label(Rect (110, 30, 100, 50), "Sun: " + Sun.sun.gameObject.GetComponent(Life).currentLife + "HP");
}
