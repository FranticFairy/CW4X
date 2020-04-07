var Constructor = function()
{
    this.getBuildFields = function(action)
    {
        var targetField = action.getActionTarget();
        var targetFields = [Qt.point(targetField.x + 1, targetField.y),
                            Qt.point(targetField.x - 1, targetField.y),
                            Qt.point(targetField.x,     targetField.y - 1),
                            Qt.point(targetField.x,     targetField.y + 1)];
        var unit = action.getTargetUnit();
        var targetTerrain = map.getTerrain(targetField.x, targetField.y);
        var ret = [];
        // check all neighbour terrains
        for (var i = 0; i < targetFields.length; i++)
        {
            if (map.onMap(targetFields[i].x, targetFields[i].y))
            {
                var terrain = map.getTerrain(targetFields[i].x, targetFields[i].y);
                var defUnit = terrain.getUnit();
                var building = terrain.getBuilding();
                // can the transported unit move over the terrain?
                if(building != null) {
                    if (((defUnit === null || defUnit === unit)) && (building.getBuildingID() == "RURAL" ||  building.getBuildingID() == "SUBURB"))
                    {
                        ret.push(targetFields[i]);
                    }
                }
            }
        }
        return ret;
    };
}

Constructor.prototype = ACTION;
var ACTION_BUILD_CORE = new Constructor();
