var Constructor = function()
{
    // called for loading the main sprite
    this.loadSprites = function(building, neutral)
    {
        if (building.getOwnerID() >= 0 && !neutral)
        {
            // none neutral player
            building.loadSprite("tradehub", false);
            building.loadSprite("tradehub+mask", true);
        }
        else
        {
            // neutral player
            building.loadSprite("tradehub+neutral", false);
        }
    };

    this.getName = function()
    {
        return qsTr("Trade Hub");
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
                owner.addFunds(3000 * moneyMod);
            }
        }

        
    };
    
}

Constructor.prototype = BUILDING;
var TRADEHUB = new Constructor();
