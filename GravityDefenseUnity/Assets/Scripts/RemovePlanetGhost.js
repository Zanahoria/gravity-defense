#pragma strict

function Update ()
{
	if (!PickingOrbit.currentOrbitHover)
		return ;
	var hit: RaycastHit;
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	if (!Physics.Raycast(ray, hit) || hit.transform.GetInstanceID() != PickingOrbit.currentOrbitHover.transform.GetInstanceID())
	{
		Destroy(PickingOrbit.planetGhostInstance.gameObject);
		PickingOrbit.planetGhostInstance = null;
		PickingOrbit.currentOrbitHover = null;
	}
}
