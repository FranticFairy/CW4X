var Constructor = function()
{
    // called for loading the main sprite
    this.loadSprites = function(building, neutral)
    {
        if (building.getOwnerID() >= 0 && !neutral)
        {
            // none neutral player
            building.loadSprite("industry", false);
            building.loadSprite("industry+mask", true);
        }
        else
        {
            // neutral player
            building.loadSprite("industry+neutral", false);
        }
    };

    this.getConstructionList = function(building)
    {
        return ["FAI_SUPP_SECURITY","FAI_SUPP_GUERILLA","FAI_TRANS_HALFT","FAI_UTIL_SUPPLY","FAI_GUN_ARTY","FAI_GUN_AT","FAI_SUPP_RECON","FAI_SUPP_ARMORCAR","FAI_TANK_LIGHT","FAI_SUPP_SPAA","FAI_SUPP_SPARTY"];
    };

    this.getName = function()
    {
        return qsTr("Industry");
    };
    this.getTerrainAnimationForeground = function(unit, terrain)
    {
        return "fore_factory";
    };

    this.getTerrainAnimationBackground = function(unit, terrain)
    {
        return "back_factory";
    };
    this.addCaptureAnimationBuilding = function(animation, building, startColor, capturedColor)
    {
        animation.addBuildingSprite("factory+mask", startColor , capturedColor, true);
        animation.addBuildingSprite("factory", startColor , capturedColor, false);
    };

    this.getActions = function()
    {
        // returns a string id list of the actions this building can perform
        return "ACTION_BUILD_UNITS";
    };

    this.getDescription = function()
    {
        return "";
    };
    this.startOfTurn = function(building)
    {
        if (building.getOwner() !== null)
        {
            var terrain = building.getTerrain();
            if(terrain != null) {
                var owner = building.getOwner();
                var moneyMod = (Math.round(owner.getFundsModifier() * 100) / 100);
                var unit = terrain.getUnit();
                if(unit != null) {
                    var alliance = unit.getOwner().checkAlliance(building.getOwner());
                    if ((alliance === GameEnums.Alliance_Enemy)) {
                        moneyMod = 0;
                    }
                }
                owner.addFunds(1000 * moneyMod);
            }
        }

        
    };
    
}

Constructor.prototype = BUILDING;
var INDUSTRY = new Constructor();
