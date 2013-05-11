#pragma strict

static var speed = 1;
static var LackRessources : int = 0;

function Start () {
LackRessources = 0;
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
		if (GUI.Button(Rect (10, 70, 90, 50), "Speed x4")) {
			speed = 4;
			Time.timeScale = 4;
		}
	}
	else {
		if (GUI.Button(Rect (10, 70, 90, 50), "Speed x1")) {
			speed = 1;
			Time.timeScale = 1;
		}
	}
	GUI.Label(Rect (110, 10, 100, 50), "Resources: " + MineralResources.nbResources);
	if (Sun.sun)
		GUI.Label(Rect (110, 30, 100, 50), "Sun: " + Sun.sun.gameObject.GetComponent(Life).currentLife + "HP");
	else
		GUI.Label(Rect (110, 30, 100, 50), "Sun: " + 0 + "HP");

	if (LevelDescriptor.state == LevelDescriptor.ISWAITING)
	{
		if (GUI.Button(Rect (10,10,90,50), "Next wave !"))
		{
			LevelDescriptor.state = LevelDescriptor.ISROUNDING;
    	}
		if (Upgrade.SelectedObject != null)
		{
			if (Upgrade.SelectedObject.isUpgradable && Upgrade.SelectedObject.TypePlanet == Upgrade.ORIGINAL)
			{
				if (GUI.Button(Rect (510,115,130,50), "Add destruction\nShield  300 RES")) 
					Upgrade.SelectedObject.UpgradeObject(Upgrade.DESTRUCTION);
				if (GUI.Button(Rect (510,170,130,50), "Add bouncy\nShield  300 RES"))
					Upgrade.SelectedObject.UpgradeObject(Upgrade.BOUNCY);
				if (GUI.Button(Rect (510,225,130,50), "Add Lasers\n150 RES")) 
					Upgrade.SelectedObject.UpgradeObject(Upgrade.LASER);
			}

			if (GUI.Button(Rect (510,60,130,50), "Destroy"))
			{
				Upgrade.SelectedObject.gameObject.GetComponent(Life).currentLife = 0;
			}
		}
	}
	if (Upgrade.SelectedObject != null)
	{
		GUI.Label(Rect (510, 5, 130, 50), "Life: " + Upgrade.SelectedObject.gameObject.GetComponent(Life).currentLife + "HP");

		if (Upgrade.SelectedObject.TypePlanet == Upgrade.BOUNCY)
		{
			GUI.Label(Rect (510, 25, 130, 50), "Bouncy\nShield : " + Upgrade.SelectedObject.gameObject.GetComponent(Shield).currentShield + "HP");
		}
		else if (Upgrade.SelectedObject.TypePlanet == Upgrade.DESTRUCTION)
		{
			GUI.Label(Rect (510, 25, 130, 50), "Destruction Shield : " + Upgrade.SelectedObject.gameObject.GetComponent(Shield).currentShield + "HP");
		}
		if (GUI.Button(Rect (620,5,25,50), "X"))
		{
			Upgrade.SelectedObject = null;
		}
	}
	
	if (LackRessources == 1)
	{
		GUI.Label(Rect (250, 10, 200, 50), "You need more ressources");
		WaitForIt();

	}

	if (GUI.Button(Rect (10, 300, 90, 50), "Add 100\nRessources")) {
	MineralResources.nbResources += 100;
		}

}

function WaitForIt()
{
	yield WaitForSeconds(5 * speed);
	LackRessources = 0;
}
