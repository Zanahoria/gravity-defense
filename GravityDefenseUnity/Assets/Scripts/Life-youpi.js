#pragma strict

public var maxLife : int = 0;
public var currentLife : int = 0;

public function AddRemoveLife(life : int)
{
	if (currentLife + life > maxLife)
		currentLife = maxLife;
	else if (currentLife + life < 0)
		currentLife = 0;
	else
		currentLife += life;
}

function Start () {

}

function Update () {

}