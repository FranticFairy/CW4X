var Constructor = function()
{
    // called for loading the main sprite
    this.loadSprites = function(building, neutral)
    {
        if (building.getOwnerID() >= 0 && !neutral)
        {
            // get army name
            var armyName = building.getOwner().getArmy().toLowerCase();
            // bh and bg have the same sprites
            if (armyName === "bg")
            {
                armyName = "bh"
            }
            building.loadSprite("hq", false);
            building.loadSprite("hq+mask", true);
        }
        else
        {
            // neutral player
            building.loadSprite("hq+neutral", false);
        }
    };
    this.getName = function()
    {
        return qsTr("HQ");
    };
    this.addCaptureAnimationBuilding = function(animation, building, startColor, capturedColor)
    {
        var player = building.getOwner();
        // get army name
        animation.addBuildingSprite("hq+os+mask", startColor , capturedColor, true);
        animation.addBuildingSprite("hq+os", startColor , capturedColor, false);
    };
    this.getDefense = function()
    {
        return 4;
    };

    this.getActions = function()
    {
        // returns a string id list of the actions this building can perform
        return "ACTION_BUILD_UNITS";
    };
    this.getConstructionList = function(building)
    {
        return ["FAI_SUPP_SECURITY","FAI_SUPP_GUERILLA","FAI_TRANS_HALFT","FAI_UTIL_SUPPLY","FAI_GUN_ARTY","FAI_GUN_AT","FAI_SUPP_RECON","FAI_SUPP_ARMORCAR","FAI_TANK_LIGHT","FAI_SUPP_SPAA","FAI_SUPP_SPARTY","FAI_4X_SETTLER","FAI_UTIL_ARV","FAI_UTIL_DOZER"];
    };
    this.getMiniMapIcon = function()
    {
        return "minimap_hq";
    };

    this.getTerrainAnimationForeground = function(unit, terrain)
    {
        var player = terrain.getBuilding().getOwner();
        // get army name
        var armyName = "os";
        if (player !== null)
        {
            armyName = player.getArmy().toLowerCase();
        }
        if (armyName === "bg")
        {
            armyName = "bh"
        }
        if ((armyName !== "os") &&
            (armyName !== "yc") &&
            (armyName !== "ge") &&
            (armyName !== "bm") &&
            (armyName !== "bh"))
        {
            armyName = "os";
        }
        return "fore_hq+" + armyName;
    };

    this.getTerrainAnimationBackground = function(unit, terrain)
    {
        var player = terrain.getBuilding().getOwner();
        // get army name
        var armyName = "os";
        if (player !== null)
        {
            armyName = player.getArmy().toLowerCase();
        }
        if (armyName === "bg")
        {
            armyName = "bh"
        }
        if ((armyName !== "os") &&
            (armyName !== "yc") &&
            (armyName !== "ge") &&
            (armyName !== "bm") &&
            (armyName !== "bh"))
        {
            armyName = "os";
        }
        return "back_hq+" + armyName;
    };

    this.getDescription = function()
    {
        return "<div c='#00ff00'>"+ qsTr("Battle ends ") + "</div>" +
               "<r>" + qsTr("when an army's last HQ is captured. ") + "</r>" +
               "<div c='#00ff00'>" + qsTr("Ground ") + "</div>" +
               "<r>" + qsTr("units can ") + "</r>" +
               "<div c='#00ff00'>" + qsTr("resupply.") + "</div>";
    };
    this.startOfTurn = function(building)
    {
        if (building.getOwner() !== null)
        {
            BUILDING.replenishUnit(building);

            var terrain = building.getTerrain();
            if(terrain != null) {
                var surroundings = terrain.getSurroundings("SUBURB,CANAL",false, false, GameEnums.Directions_All, false, true);
                var suburbs = surroundings.replace(/[^+]/g, "").length;
                var owner = building.getOwner();
                var moneyMod = (Math.round(owner.getFundsModifier() * 100) / 100);
                var surroundings2 = terrain.getSurroundings("RURAL",false, false, GameEnums.Directions_All, false, true);
                var rurals = surroundings2.replace(/[^+]/g, "").length;
                owner.addFunds((2500 + (suburbs * 500) + (rurals * 250)) * moneyMod);

                ACTION_CITY_EXPAND.perform(building,terrain);
            }
        }

        
    };
}

Constructor.prototype = BUILDING;
var HQ = new Constructor();
