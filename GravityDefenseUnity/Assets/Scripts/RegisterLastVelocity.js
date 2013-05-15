#pragma strict

var lastVelocity : Vector3;
var lastAngularVelocity : Vector3;

function Update ()
{
	lastVelocity = this.rigidbody.velocity;
	lastAngularVelocity = this.rigidbody.angularVelocity;
}

function SetToLastVelocity()
{
	this.rigidbody.velocity = lastVelocity;
	this.rigidbody.angularVelocity = lastAngularVelocity;
}
