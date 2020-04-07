var Constructor = function () {
    // called for loading the main sprite
    this.canBePerformed = function (action) {
        var unit = action.getTargetUnit();
        var actionTargetField = action.getActionTarget();
        var targetField = action.getTarget();

        if ((unit.getHasMoved() === true)) {
            return false;
        }
        if ((actionTargetField.x === targetField.x) && (actionTargetField.y === targetField.y) ||
            (action.getMovementTarget() === null)) {
            if (ACTION_BUILD_INFRA_BRIDGE.getBuildFields(action).length > 0) {
                return true;
            }
        }
        return false;
    };

    this.getActionText = function () {
        return qsTr("Build Bridge");
    };
    this.getIcon = function () {
        return "build";
    };
    this.isFinalStep = function (action) {
        if (action.getInputStep() === 1) {
            return true;
        }
        else {
            return false;
        }
    };
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
                var buildables = ["RIVER"];

                // can the transported unit move over the terrain?
                if (terrain != null) {
                    var surroundings = terrain.getSurroundings("STREET,BRIDGE,RAILCROSS,DESERT_PATH,AIRPORT,FACTORY,HARBOUR,HQ,LABOR,STATION,TOWN,RURAL,TOWER,SUBURB,CANAL",false, false, GameEnums.Directions_Direct, false, true);
                    if (((defUnit === null || defUnit === unit) && building === null && (surroundings != "" && surroundings != null))) {
                        var index = buildables.indexOf(terrain.getTerrainID());
                        if (index > -1) {
                                ret.push(targetFields[i]);
                        }
                    }
                }
            }
        }
        return ret;
    };

    this.getStepInputType = function (action) {
        return "FIELD";
    };

    this.getStepData = function (action, data) {
        var unit = action.getTargetUnit();
        var actionTargetField = action.getActionTarget();
        data.setColor("#C800FF00");
        var fields = ACTION_BUILD_INFRA_BRIDGE.getBuildFields(action);
        for (var i3 = 0; i3 < fields.length; i3++) {
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
        animation.setEndOfAnimationCall("ACTION_BUILD_INFRA_BRIDGE", "performPostAnimation");
        // move unit to target position
        unit.moveUnitAction(action);
        // disable unit commandments for this turn
        ACTION_BUILD_INFRA_BRIDGE.postAnimationUnit = unit;
        //unit.setHasMoved(true);
        action.startReading();
        var x = action.readDataInt32();
        var y = action.readDataInt32();
        unit.setHasMoved(true);
        ACTION_BUILD_INFRA_BRIDGE.postAnimationBuildPosX = x;
        ACTION_BUILD_INFRA_BRIDGE.postAnimationBuildPosY = y;

    };
    this.performPostAnimation = function (postAnimation) {
        // unloading the units here :)
        var player = map.getCurrentPlayer();
        var X = ACTION_BUILD_INFRA_BRIDGE.postAnimationBuildPosX;
        var Y = ACTION_BUILD_INFRA_BRIDGE.postAnimationBuildPosY;
        map.replaceTerrain("BRIDGE", X, Y, true, true);
        map.getTerrain(X, Y).loadSprites();

        map.getTerrain(X, Y+1).loadSprites();
        map.getTerrain(X+1, Y).loadSprites();
        map.getTerrain(X+1, Y+1).loadSprites();

        map.getTerrain(X-1, Y+1).loadSprites();
        map.getTerrain(X+1, Y-1).loadSprites();

        map.getTerrain(X-1, Y).loadSprites();
        map.getTerrain(X-1, Y-1).loadSprites();
        map.getTerrain(X, Y-1).loadSprites();
        
        audio.playSound("unload.wav");
        ACTION_BUILD_INFRA_BRIDGE.postAnimationBuildPosX = -1;
        ACTION_BUILD_INFRA_BRIDGE.postAnimationBuildPosY = -1;
    };
}

Constructor.prototype = ACTION;
var ACTION_BUILD_INFRA_BRIDGE = new Constructor();
