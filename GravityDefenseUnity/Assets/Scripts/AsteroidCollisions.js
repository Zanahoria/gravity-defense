#pragma strict

function Start () {

}

function OnCollisionEnter(collision : Collision)
{
	var life1 : Life = this.gameObject.GetComponent(Life);
	var life2 : Life = collision.gameObject.GetComponent(Life);
	
	var tmpLife : int = life1.currentLife;
	life1.AddRemoveLife(-life2.currentLife);
	life2.AddRemoveLife(-tmpLife);
}

function Update () {

}