var Constructor = function () {
    this.canBePerformed = function (action) {
        var unit = action.getTargetUnit();
        var actionTargetField = action.getActionTarget();
        var targetField = action.getTarget();

        if ((unit.getHasMoved() === true)) {
            return false;
        }
        if ((actionTargetField.x === targetField.x) && (actionTargetField.y === targetField.y) ||
            (action.getMovementTarget() === null)) {
            if (ACTION_BUILD_FOUND_CITY.getBuildFields(action).length > 0) {
                return true;
            }
        }
        return false;
    }
    this.getBuildFields = function (action) {
        var targetField = action.getActionTarget();
        var targetFields = [Qt.point(targetField.x + 1, targetField.y),
        Qt.point(targetField.x - 1, targetField.y),
        Qt.point(targetField.x, targetField.y - 1),
        Qt.point(targetField.x, targetField.y + 1)];
        var unit = action.getTargetUnit();
        var targetTerrain = map.getTerrain(targetField.x, targetField.y);
        var ret = [];
        // check all neighbour terrains
        for (var i = 0; i < targetFields.length; i++) {
            if (map.onMap(targetFields[i].x, targetFields[i].y)) {
                var terrain = map.getTerrain(targetFields[i].x, targetFields[i].y);
                var defUnit = terrain.getUnit();
                var building = terrain.getBuilding();

                var buildables = ["PLAINS", "FOREST", "STREET", "DESERT", "DESERT_PATH", "DESERT_FOREST", "SNOW", "SNOW_FOREST", "PLAINS_DESTROYED", "PLAINS_PLASMA", "RUIN", "WASTELAND", "FIRE", "DESTROYEDWELD", "DESERT_DESTROYEDWELD", "SNOW_DESTROYEDWELD", "DESERT_WASTELAND", "SNOW_WASTELAND"];
                // can the transported unit move over the terrain?
                if (terrain != null && (defUnit === null || defUnit === unit)) {
                    if (buildables.indexOf(terrain.getTerrainID() >= 0)) {
                        ret.push(targetFields[i]);
                    }
                }
            }
        }
        return ret;
    };
    this.develop = function (X, Y, buildable) {
        var targetTerrain = map.getTerrain(X, Y);
        var buildables = ["PLAINS", "FOREST", "STREET", "DESERT", "DESERT_PATH", "DESERT_FOREST", "SNOW", "SNOW_FOREST", "PLAINS_DESTROYED", "PLAINS_PLASMA", "RUIN", "WASTELAND", "FIRE", "DESTROYEDWELD", "DESERT_DESTROYEDWELD", "SNOW_DESTROYEDWELD", "DESERT_WASTELAND", "SNOW_WASTELAND"];

        if (targetTerrain != null) {
            var unit = targetTerrain.getUnit();
            var hostile = false;
            if (unit != null) {
                var alliance = unit.getOwner().checkAlliance(building.getOwner());
                if ((alliance != GameEnums.Alliance_Enemy)) {
                    hostile = true;
                }
            }
            if (hostile === false && buildables.indexOf(targetTerrain.getTerrainID() >= 0)) {
                var index = buildables.indexOf(targetTerrain.getTerrainID());
                if(index > -1) {
                    targetTerrain.loadBuilding("RURAL");
                    targetTerrain.loadSprites();
                    ACTION_BUILD_FOUND_CITY.updateSurroundings(X, Y);
                }
            }
        }
    }

    this.updateSurroundings = function (X, Y) {
        var targetTerrain = map.getTerrain(X, Y);
        targetTerrain = map.getTerrain(X, Y - 1)
        if (targetTerrain != null) {
            targetTerrain.loadSprites();
        }
        targetTerrain = map.getTerrain(X, Y + 1)
        if (targetTerrain != null) {
            targetTerrain.loadSprites();
        }
        targetTerrain = map.getTerrain(X - 1, Y)
        if (targetTerrain != null) {
            targetTerrain.loadSprites();
        }
        targetTerrain = map.getTerrain(X + 1, Y)
        if (targetTerrain != null) {
            targetTerrain.loadSprites();
        }

        targetTerrain = map.getTerrain(X - 1, Y - 1)
        if (targetTerrain != null) {
            targetTerrain.loadSprites();
        }
        targetTerrain = map.getTerrain(X + 1, Y + 1)
        if (targetTerrain != null) {
            targetTerrain.loadSprites();
        }
        targetTerrain = map.getTerrain(X - 1, Y + 1)
        if (targetTerrain != null) {
            targetTerrain.loadSprites();
        }
        targetTerrain = map.getTerrain(X + 1, Y - 1)
        if (targetTerrain != null) {
            targetTerrain.loadSprites();
        }
    }

    this.getActionText = function () {
        return qsTr("Found City");
    };
    this.getIcon = function () {
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
        var fields = ACTION_BUILD_FOUND_CITY.getBuildFields(action);
        for (var i3 = 0; i3 < fields.length; i3++)
        {
            data.addPoint(Qt.point(fields[i3].x, fields[i3].y));
        }
    };



    this.postAnimationBuildPosX = -1;
    this.postAnimationBuildPosY = -1;
    this.postAnimationUnit = null;
    this.perform = function (action) {
        // we need to move the unit to the target position
        var unit = action.getTargetUnit();
        var animation = Global[unit.getUnitID()].doWalkingAnimation(action);
        animation.setEndOfAnimationCall("ACTION_BUILD_FOUND_CITY", "performPostAnimation");
        // move unit to target position
        unit.moveUnitAction(action);
        // disable unit commandments for this turn
        ACTION_BUILD_FOUND_CITY.postAnimationUnit = unit;
        //unit.setHasMoved(true);
        action.startReading();
        var x = action.readDataInt32();
        var y = action.readDataInt32();
        ACTION_BUILD_FOUND_CITY.postAnimationBuildPosX = x;
        ACTION_BUILD_FOUND_CITY.postAnimationBuildPosY = y;

    };
    this.performPostAnimation = function (postAnimation) {
        // unloading the units here :)
        var player = map.getCurrentPlayer();
        if (map != null) {
            var X = ACTION_BUILD_FOUND_CITY.postAnimationBuildPosX;
            var Y = ACTION_BUILD_FOUND_CITY.postAnimationBuildPosY;
            var targetTerrain = map.getTerrain(X, Y);
            var player = ACTION_BUILD_FOUND_CITY.postAnimationUnit.getOwner();
            ACTION_BUILD_FOUND_CITY.postAnimationUnit.removeUnit();
            if (targetTerrain != null && player != null) {
                targetTerrain.loadBuilding("TOWN");
                targetTerrain.loadSprites();
                targetTerrain.getBuilding().setOwner(player);

                ACTION_BUILD_FOUND_CITY.develop(X, Y - 1);
                ACTION_BUILD_FOUND_CITY.develop(X, Y + 1);
                ACTION_BUILD_FOUND_CITY.develop(X - 1, Y);
                ACTION_BUILD_FOUND_CITY.develop(X + 1, Y);
                ACTION_BUILD_FOUND_CITY.develop(X - 1, Y - 1);
                ACTION_BUILD_FOUND_CITY.develop(X + 1, Y + 1);
                ACTION_BUILD_FOUND_CITY.develop(X - 1, Y + 1);
                ACTION_BUILD_FOUND_CITY.develop(X + 1, Y - 1);

                audio.playSound("unload.wav");
                ACTION_BUILD_FOUND_CITY.postAnimationBuildPosX = -1;
                ACTION_BUILD_FOUND_CITY.postAnimationBuildPosY = -1;
            }
        }
    };
}

Constructor.prototype = ACTION;
var ACTION_BUILD_FOUND_CITY = new Constructor();
