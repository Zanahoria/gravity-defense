#pragma strict

static var sun : Transform;
static var isDead : boolean;

function Start () {
	sun = this.transform;
	isDead = false;
}
