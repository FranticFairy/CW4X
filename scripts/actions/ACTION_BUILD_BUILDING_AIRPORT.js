var Constructor = function()
{
    // called for loading the main sprite
    this.canBePerformed = function(action)
    {
        var unit = action.getTargetUnit();
        var actionTargetField = action.getActionTarget();
        var targetField = action.getTarget();

        if ((unit.getHasMoved() === true))
        {
            return false;
        }
        if ((actionTargetField.x === targetField.x) && (actionTargetField.y === targetField.y) ||
                (action.getMovementTarget() === null))
        {
            if (ACTION_BUILD_CORE.getBuildFields(action).length > 0)
            {
                return true;
            }
        }
        return false;
    };

    this.getActionText = function()
    {
        return qsTr("Build Airport");
    };
    this.getIcon = function()
    {
        return "build";
    };
    this.isFinalStep = function(action)
    {
        if (action.getInputStep() === 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    this.getStepInputType = function(action)
    {        
        return "FIELD";
    };

    this.getStepData = function(action, data)
    {
        var unit = action.getTargetUnit();
        var actionTargetField = action.getActionTarget();
        data.setColor("#C800FF00");
        var fields = ACTION_BUILD_CORE.getBuildFields(action);
        for (var i3 = 0; i3 < fields.length; i3++)
        {
            data.addPoint(Qt.point(fields[i3].x, fields[i3].y));
        }
    };

    this.postAnimationBuildPosX = -1;
    this.postAnimationBuildPosY = -1;
    this.postAnimationUnit = null;
    this.perform = function(action)
    {
        // we need to move the unit to the target position
        var unit = action.getTargetUnit();
        var animation = Global[unit.getUnitID()].doWalkingAnimation(action);
        animation.setEndOfAnimationCall("ACTION_BUILD_BUILDING_AIRPORT", "performPostAnimation");
        // move unit to target position
        unit.moveUnitAction(action);
        // disable unit commandments for this turn
        ACTION_BUILD_BUILDING_AIRPORT.postAnimationUnit = unit;
        //unit.setHasMoved(true);
        action.startReading();
        var x = action.readDataInt32();
        var y = action.readDataInt32();
        ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosX = x;
        ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosY = y;
        
    };
    this.performPostAnimation = function(postAnimation)
    {
        // unloading the units here :)
        var player = map.getCurrentPlayer();
        if(map != null) {
            var targetTerrain = map.getTerrain(ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosX, ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosY);
            var player = ACTION_BUILD_BUILDING_AIRPORT.postAnimationUnit.getOwner();
            ACTION_BUILD_BUILDING_AIRPORT.postAnimationUnit.moveUnitToField(ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosX, ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosY);
            ACTION_BUILD_BUILDING_AIRPORT.postAnimationUnit.setHasMoved(true);
            if(targetTerrain != null && player != null) {
                targetTerrain.loadBuilding("AIRPORT");
                targetTerrain.loadSprites();
                targetTerrain.getBuilding().setOwner(player);
                
                map.getTerrain(ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosX, ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosY+1).loadSprites();
                map.getTerrain(ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosX+1, ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosY).loadSprites();
                map.getTerrain(ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosX+1, ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosY+1).loadSprites();
        
                map.getTerrain(ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosX-1, ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosY+1).loadSprites();
                map.getTerrain(ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosX+1, ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosY-1).loadSprites();
        
                map.getTerrain(ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosX-1, ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosY).loadSprites();
                map.getTerrain(ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosX-1, ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosY-1).loadSprites();
                map.getTerrain(ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosX, ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosY-1).loadSprites();
                
                audio.playSound("unload.wav");
                ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosX = -1;
                ACTION_BUILD_BUILDING_AIRPORT.postAnimationBuildPosY = -1;
            }
        }
    };
}

Constructor.prototype = ACTION;
var ACTION_BUILD_BUILDING_AIRPORT = new Constructor();
