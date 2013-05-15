#pragma strict

function Update ()
{
	if (IngameGUI.buttonPushed)
	{
		IngameGUI.buttonPushed = false;
		return;
	}
	if (Upgrade.SelectedObject && Input.GetMouseButtonUp(0))
	{
		var hit: RaycastHit;
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if (!Physics.Raycast(ray, hit) || hit.transform.GetInstanceID() != Upgrade.SelectedObject.transform.GetInstanceID())
		{
			Upgrade.SelectedObject = null;
		}
	}
}
