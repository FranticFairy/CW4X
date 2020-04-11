var Constructor = function () {
    this.perform = function (building) {
        var X = building.getX();
        var Y = building.getY();
        var terrain = map.getTerrain(X, Y);
        if (terrain != null) {
            var surroundings = terrain.getSurroundings("FOREST,DESERT_FOREST,SNOW_FOREST", false, false, GameEnums.Directions_Direct, false, false);
            if (surroundings != "" && surroundings != null) {
                ACTION_HANDLER_FIRE.spread(terrain, surroundings);
            }
            var weather = map.getGameRules().getCurrentWeather().getWeatherId()
            if (weather === "WEATHER_SNOW" || weather === "WEATHER_RAIN") {
                var randomNumber = Math.floor((Math.random() * 6) + 1);
            }
            else {
                var randomNumber = Math.floor((Math.random() * 10) + 1);
            }
            if (randomNumber === 1 || randomNumber === 10) {
                map.replaceTerrain("PLAINS_PLASMA", X, Y);
                ACTION_BUILD_FOUND_CITY.updateSurroundings(X, Y);
            }
        }
    }

    this.spread = function (terrain, surroundings) {
        var list = [];
        if (surroundings.includes("+N")) {
            list.push("N");
        }
        if (surroundings.includes("+E")) {
            list.push("E");
        }
        if (surroundings.includes("+S")) {
            list.push("S");
        }
        if (surroundings.includes("+W")) {
            list.push("W");
        }
        var weather = map.getGameRules().getCurrentWeather().getWeatherId()
        var selected = list[Math.floor(Math.random() * list.length)];
        var diceSize = 6;
        if (weather === "WEATHER_SNOW" || weather === "WEATHER_RAIN") {
            diceSize = 10;
        }
        for (var looper = 0; looper < list.length; looper++) {
            var selected = list[looper];
            switch (selected) {
                case "N":
                    var randomNumber = Math.floor((Math.random() * diceSize) + 1);
                    if (randomNumber === 1 || randomNumber === 6) {
                        ACTION_HANDLER_FIRE.ignite(terrain.getX(), terrain.getY() - 1);
                    }
                    break;
                case "E":
                    var randomNumber = Math.floor((Math.random() * diceSize) + 1);
                    if (randomNumber === 1 || randomNumber === 6) {
                        ACTION_HANDLER_FIRE.ignite(terrain.getX() + 1, terrain.getY());
                    }
                    break;
                case "S":
                    var randomNumber = Math.floor((Math.random() * diceSize) + 1);
                    if (randomNumber === 1 || randomNumber === 6) {
                        ACTION_HANDLER_FIRE.ignite(terrain.getX(), terrain.getY() + 1);
                    }
                    break;
                case "W":
                    var randomNumber = Math.floor((Math.random() * diceSize) + 1);
                    if (randomNumber === 1 || randomNumber === 6) {
                        ACTION_HANDLER_FIRE.ignite(terrain.getX() - 1, terrain.getY());
                    }
                    break;
            }

        }
    }

    this.ignite = function (X, Y) {
        var terrain = map.getTerrain(X, Y);
        var defUnit = terrain.getUnit();
        if(defUnit != null) {
            if(defUnit.getUnitType() !== GameEnums.UnitType_Air) {
                defUnit.killUnit();
            }
        }
        terrain.loadBuilding("BURNING");
        ACTION_BUILD_FOUND_CITY.updateSurroundings(X, Y);
    }
}

Constructor.prototype = ACTION;
var ACTION_HANDLER_FIRE = new Constructor();
