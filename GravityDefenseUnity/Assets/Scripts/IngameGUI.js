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
	GUI.Label(Rect (110, 10, 100, 50), "Resources: " + MineralResources.nbResources);
	if (Sun.sun)
		GUI.Label(Rect (110, 30, 100, 50), "Sun: " + Sun.sun.gameObject.GetComponent(Life).currentLife + "HP");
	else
		GUI.Label(Rect (110, 30, 100, 50), "Sun: " + 0 + "HP");

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
		GUI.Label(Rect (Screen.width - 80, 5, 130, 50), "Life: " + Upgrade.SelectedObject.gameObject.GetComponent(Life).currentLife + "HP");

		if (Upgrade.SelectedObject.TypePlanet == Upgrade.BOUNCY)
		{
			GUI.Label(Rect (Screen.width - 150, 25, 200, 50), "Bouncy Shield : " + Upgrade.SelectedObject.gameObject.GetComponent(Shield).currentShield + "HP");
		}
		else if (Upgrade.SelectedObject.TypePlanet == Upgrade.DESTRUCTION)
		{
			GUI.Label(Rect (Screen.width - 150, 25, 200, 50), "Destruction Shield : " + Upgrade.SelectedObject.gameObject.GetComponent(Shield).currentShield + "HP");
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
		
		
//	// number of enemies by direction display
//	
//	if (LevelDescriptor.state == LevelDescriptor.ISWAITING && LevelDescriptor.roundId < LevelDescriptor.rounds.Count)
//	{
//		for (var wave in LevelDescriptor.rounds[LevelDescriptor.roundId].waves)
//		{
//			for (var direction in wave.directions)
//			{
//				var angle : float = direction.angle;
//				
//				var position3D = Vector3(30 * Mathf.Cos(angle), 0, 30 * Mathf.Sin(angle));
//				var position = Camera.mainCamera.WorldToScreenPoint(position3D);
//				position.y = Screen.height - position.y;
//				GUI.Label(Rect (position.x, position.y - 50 / 4, 200, 50), "x" + direction.asteroidNb);
//			}
//		}
//	}
//
}

function WaitForIt()
{
	yield WaitForSeconds(5 * speed);
	LackRessources = 0;
}
