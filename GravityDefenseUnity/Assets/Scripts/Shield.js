#pragma strict

public var maxShield : int = 0;
public var currentShield : int = 0;

function Start () {
	maxShield = 0;
	currentShield = 0;
}

function Update () {
	if (LevelDescriptor.state == LevelDescriptor.ISWAITING)
		currentShield = maxShield;
}

public function AddRemoveShield(shield : int)
{
	if (currentShield + shield > maxShield)
		currentShield = maxShield;
	else if (currentShield + shield < 0)
		currentShield = 0;
	else
		currentShield += shield;
}