var Constructor = function()
{
    // called for loading the main sprite
    this.loadSprites = function(building, neutral)
    {
        if (building.getOwnerID() >= 0 && !neutral)
        {
            // none neutral player
            building.loadSprite("town", false);
            building.loadSprite("town+mask", true);
        }
        else
        {
            // neutral player
            building.loadSprite("town+neutral", false);
        }
    };
    this.getConstructionList = function(building)
    {
        return ["FAI_SUPP_SECURITY","FAI_SUPP_GUERILLA","FAI_UTIL_SUPPLY","FAI_TRANS_HALFT","FAI_IFV","FAI_IFV_AMPHI","FAI_IFV_HEAVY","FAI_GUN_ARTY","FAI_GUN_AT","FAI_TANK_LIGHT","FAI_TANK_BATTLE","FAI_TANK_HEAVY","FAI_SUPP_SPAA","FAI_SUPP_SPARTY","FAI_LAUNCHER_SAM","FAI_LAUNCHER_WMD","FAI_LAUNCHER_RKT","FAI_LAUNCHER_ASM","FAI_SUPP_RECON","FAI_SUPP_ARMORCAR","FAI_TANK_HOVER","FAI_HOVERCRAFT","FAI_HOVER_HEAVY","FAI_HOVER_TRANS","FAI_UTIL_AVLB","FAI_UTIL_ARV","FAI_UTIL_DOZER","FAI_CASH_TRUCK","FAI_TANK_SWEEP"];
    };

    this.getName = function()
    {
        return qsTr("Town");
    };

    this.getDescription = function()
    {
        return "<r>" + qsTr("Populated city. Once captured ") + "</r>" +
               "<div c='#00ff00'>" + qsTr("ground ") + "</div>" +
               "<r>" + qsTr("units can ") + "</r>" +
               "<div c='#00ff00'>" + qsTr("resupply") + "</div>" +
               "<r>" + qsTr(".") + "</r>";
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
                owner.addFunds((1000 + (suburbs * 500) + (rurals * 250)) * moneyMod);

                ACTION_CITY_EXPAND.perform(building,terrain);
            }
        }

        
    };
    
}

Constructor.prototype = BUILDING;
var TOWN = new Constructor();
