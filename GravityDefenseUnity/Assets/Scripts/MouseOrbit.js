var target : Transform;
var distance = 10.0;
var zoomMin = 0;
var zoomMax = 100;

var xSpeed = 250.0;
var ySpeed = 120.0;

var yMinLimit = -20;
var yMaxLimit = 80;

private var x = 0.0;
private var y = 0.0;

@script AddComponentMenu("Camera-Control/Mouse Orbit")

function Start () {
    var angles = transform.eulerAngles;
    x = angles.y;
    y = angles.x;

	// Make the rigid body not change rotation
   	if (rigidbody)
		rigidbody.freezeRotation = true;

	moveCamera(0, 0);
}

function moveCamera(mousex, mousey)
{
	x += mousex * xSpeed * 0.02;
	y -= mousey * ySpeed * 0.02;
	
	y = ClampAngle(y, yMinLimit, yMaxLimit);
	       
	var rotation = Quaternion.Euler(y, x, 0);
	var position = rotation * Vector3(0.0, 0.0, -distance) + target.position;
	
	transform.rotation = rotation;
	transform.position = position;
}

function LateUpdate () {
    if (target && Input.GetMouseButton(1))
	    moveCamera(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y"));
    if (Input.GetAxis("Mouse ScrollWheel") > 0)
    {
    	if (distance - 5 < zoomMin)
    		distance = zoomMin;
   		else
	    	distance -= 5;
	    moveCamera(0, 0);
    }
    else if (Input.GetAxis("Mouse ScrollWheel") < 0)
    {
    	if (distance + 5 > zoomMax)
    		distance = zoomMax;
   		else
	    	distance += 5;
	    moveCamera(0, 0);
    }
}

static function ClampAngle (angle : float, min : float, max : float) {
	if (angle < -360)
		angle += 360;
	if (angle > 360)
		angle -= 360;
	return Mathf.Clamp (angle, min, max);
}