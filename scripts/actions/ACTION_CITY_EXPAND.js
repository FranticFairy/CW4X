var Constructor = function () {
    this.perform = function (building, terrain) {
        var surroundingsDirect = terrain.getSurroundings("RURAL", false, false, GameEnums.Directions_Direct, false, true);
        var surroundingsAll = terrain.getSurroundings("RURAL", false, false, GameEnums.Directions_All, false, true);
        var list = [];
        if(surroundingsDirect.includes("+N")) {
            list.push("N");
        }
        if(surroundingsDirect.includes("+E")) {
            list.push("E");
        }
        if(surroundingsDirect.includes("+S")) {
            list.push("S");
        }
        if(surroundingsDirect.includes("+W")) {
            list.push("W");
        }
        if(surroundingsAll.includes("+NE")) {
            list.push("NE");
        }
        if(surroundingsAll.includes("+SE")) {
            list.push("SE");
        }
        if(surroundingsAll.includes("+SW")) {
            list.push("SW");
        }
        if(surroundingsAll.includes("+NW")) {
            list.push("NW");
        }
        var selected = list[Math.floor(Math.random() * list.length)];
        switch(selected) {
            case "N":
                ACTION_CITY_EXPAND.upgrade(building.getX(),building.getY()-1);
            break;
            case "E":
                ACTION_CITY_EXPAND.upgrade(building.getX()+1,building.getY());
            break;
            case "S":
                ACTION_CITY_EXPAND.upgrade(building.getX(),building.getY()+1);
            break;
            case "W":
                ACTION_CITY_EXPAND.upgrade(building.getX()-1,building.getY());
            break;
            case "NE":
                ACTION_CITY_EXPAND.upgrade(building.getX()+1,building.getY()-1);
            break;
            case "SE":
                ACTION_CITY_EXPAND.upgrade(building.getX()+1,building.getY()+1);
            break;
            case "SW":
                ACTION_CITY_EXPAND.upgrade(building.getX()-1,building.getY()+1);
            break;
            case "NW":
                ACTION_CITY_EXPAND.upgrade(building.getX()-1,building.getY()-1);
            break;
        }
    }

    this.upgrade = function(X,Y) {
        if(map != null) {
            var targetTerrain = map.getTerrain(X, Y);
            if(targetTerrain != null) {
                targetTerrain.loadBuilding("SUBURB");
                targetTerrain.loadSprites();
                ACTION_BUILD_FOUND_CITY.updateSurroundings(X, Y);
            }
        }
    }
}

Constructor.prototype = ACTION;
var ACTION_CITY_EXPAND = new Constructor();
