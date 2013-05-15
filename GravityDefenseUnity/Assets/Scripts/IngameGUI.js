#pragma strict

static var speed = 1;
static var LackRessources : int = 0;

public var objectSelectedInfosStyle : GUIStyle;
public var globalInfosStyle : GUIStyle;

var upgradeRect : Rect = Rect (20, 20, 120, 50);

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
	// speed setting button
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
	
	// global infos display (resources, life)
	GUI.Label(Rect (110, 10, 100, 50), "Resources: " + MineralResources.nbResources, globalInfosStyle);
	if (Sun.sun)
		GUI.Label(Rect (110, 30, 100, 50), "Sun: " + Sun.sun.gameObject.GetComponent(Life).currentLife + "HP", globalInfosStyle);
	else
		GUI.Label(Rect (110, 30, 100, 50), "Sun: " + 0 + "HP", globalInfosStyle);

	if (LevelDescriptor.state == LevelDescriptor.ISWAITING)
	{
		// next wave button
		if (!Sun.isDead && GUI.Button(Rect (10,10,90,50), "Next wave !"))
		{
			LevelDescriptor.state = LevelDescriptor.ISROUNDING;
    	}
    	
    	// upgrades and destroy buttons
		if (Upgrade.SelectedObject != null)
		{
			if (Upgrade.SelectedObject.isUpgradable && Upgrade.SelectedObject.TypePlanet == Upgrade.ORIGINAL)
			{
				if (GUI.Button(Rect (Screen.width - 140, 115, 130, 50), "Add destruction\nShield  300 RES"))
					Upgrade.SelectedObject.UpgradeObject(Upgrade.DESTRUCTION);
				if (GUI.Button(Rect (Screen.width - 140, 170, 130, 50), "Add bouncy\nShield  300 RES"))
					Upgrade.SelectedObject.UpgradeObject(Upgrade.BOUNCY);
				if (GUI.Button(Rect (Screen.width - 140, 225, 130, 50), "Add Lasers\n150 RES"))
					Upgrade.SelectedObject.UpgradeObject(Upgrade.LASER);
			}
			if (Upgrade.SelectedObject.isSalable && GUI.Button(Rect (Screen.width - 140, 60, 130, 50), "Sell"))
			{
				Upgrade.SelectedObject.gameObject.GetComponent(Life).currentLife = 0;
			}
		}
	}
	
	// life and upgrades bought display
	if (Upgrade.SelectedObject != null)
	{
		var nameDefinition = Upgrade.SelectedObject.gameObject.GetComponent(NameDefinition);
		var name : String = "";
		if (nameDefinition)
			name = nameDefinition.objectName + " - ";
		
		GUI.Label(Rect (Screen.width - 60, 5, 50, 16), name + "Life : " + Upgrade.SelectedObject.gameObject.GetComponent(Life).currentLife + "HP", objectSelectedInfosStyle);

		if (Upgrade.SelectedObject.TypePlanet == Upgrade.BOUNCY)
		{
			GUI.Label(Rect (Screen.width - 60, 5 + 24, 50, 16), "Bouncy Shield : " + Upgrade.SelectedObject.gameObject.GetComponent(Shield).currentShield + "HP", objectSelectedInfosStyle);
		}
		else if (Upgrade.SelectedObject.TypePlanet == Upgrade.DESTRUCTION)
		{
			GUI.Label(Rect (Screen.width - 60, 5 + 24, 50, 16), "Destruction Shield : " + Upgrade.SelectedObject.gameObject.GetComponent(Shield).currentShield + "HP", objectSelectedInfosStyle);
		}
		else if (Upgrade.SelectedObject.TypePlanet == Upgrade.LASER)
		{
			GUI.Label(Rect (Screen.width - 60, 5 + 24, 50, 16), "Laser Activated", objectSelectedInfosStyle);
		}
	}
	
	// need more resources display
	if (LackRessources == 1)
	{
		GUI.Label(Rect (250, 10, 200, 50), "You need more ressources");
		WaitForIt();
	}
	
	// retry game button
	
	if (Sun.isDead)
	{
		if (GUI.Button(Rect (Screen.width / 2 - 90 / 2, Screen.height / 2 - 40 / 2, 90, 40), "You loose...\nRetry ?"))
			Application.LoadLevel("gravitydefense");
	}
	else if (LevelDescriptor.state == LevelDescriptor.ISFINISHED)
	{
		if (GUI.Button(Rect (Screen.width / 2 - 90 / 2, Screen.height / 2 - 40 / 2, 90, 40), "You win!\nRetry ?"))
			Application.LoadLevel("gravitydefense");
	}

	// debug button to give resources
	if (GUI.Button(Rect (10, Screen.height - 60, 90, 50), "Add 100\nRessources")) {
	MineralResources.nbResources += 100;
		}
		
	// create upgrade window 
	if (Upgrade.SelectedObject != null)
		upgradeRect = GUI.Window (0, upgradeRect, DoMyUpgradeWindow, Upgrade.SelectedObject.gameObject.GetComponent(NameDefinition).objectName);

}

function ignoreEvent()
{
	if (Event.current.type != EventType.Layout && Event.current.type != EventType.Repaint)
	    Event.current.Use ();
}

function DoMyUpgradeWindow (windowID : int) {
    if (GUI.Button (Rect (10,20,100,20), "Hello World"))
    {
        print ("Got a click");
        ignoreEvent();
    }
//    ignoreEvent();
}

function WaitForIt()
{
	yield WaitForSeconds(5 * speed);
	LackRessources = 0;
}
