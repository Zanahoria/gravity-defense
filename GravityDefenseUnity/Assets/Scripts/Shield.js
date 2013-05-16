#pragma strict

public var maxShield : int = 0;
public var currentShield : int = 0;

public var mat_shield_bounce : Material;
public var mat_shield_destruct : Material;

function Start () {
	maxShield = 0;
	currentShield = 0;
}

function Update () {
	var mat;
	if (LevelDescriptor.state == LevelDescriptor.ISWAITING)
		currentShield = maxShield;
	if (currentShield > 0) {
		if (gameObject.GetComponent(Upgrade).TypePlanet == Upgrade.DESTRUCTION)
			mat = [ renderer.materials[0], mat_shield_destruct ];
		else
			mat = [ renderer.materials[0], mat_shield_bounce ];
	}
	else {
		mat = [ renderer.materials[0] ];
	}
	renderer.materials = mat;
}

public function AddRemoveShield(shield : int)
{
	if (currentShield + shield > maxShield) {
		currentShield = maxShield;
	}
	else if (currentShield + shield < 0) {
		currentShield = 0;
	}
	else
		currentShield += shield;
}