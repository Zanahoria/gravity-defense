import System.Collections.Generic;
 
static var G = 0.2f; // adjust with try & error
 
static var planets = List.<Gravity>();
private var myRigidbody : Rigidbody;

public var gravityMultiplier : float = 1.0f;
public var initialForwardSpeed : Vector3;
public var initialRotationSpeed : Vector3;
public var attractCoef : float = 1.0f;
 
function Awake()
{
    myRigidbody = rigidbody;
    if (myRigidbody.isKinematic) {
		return;
	}
}
 
function OnEnable()
{
    planets.Add(this);
}
 
function OnDisable()
{
    planets.Remove(this);
}
 
function FixedUpdate()
{
	if (myRigidbody.isKinematic) {
		return;
	}
    var pos = myRigidbody.position;
    var acc = Vector3.zero;
    for(var planet in planets)
    {
        if (planet.rigidbody == myRigidbody)
            continue;
        var direction = (planet.rigidbody.position - pos);
       	acc += G * (direction.normalized * planet.rigidbody.mass * planet.gravityMultiplier * this.attractCoef) / direction.sqrMagnitude;
    }
    myRigidbody.velocity += acc * Time.fixedDeltaTime;
}