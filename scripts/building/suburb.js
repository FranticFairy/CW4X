var Constructor = function()
{
    // called for loading the main sprite
    this.loadSprites = function(building, neutral)
    {
        building.loadSprite("urban", false);
        if (building.getOwnerID() >= 0 && !neutral)
        {
            building.loadSprite("no-own+mask", true);
        }
    };
    this.getName = function()
    {
        return qsTr("Suburbs");
    };

    this.getDescription = function()
    {
        return "";
    };
    this.startOfTurn = function(building)
    {
    };
    
}

Constructor.prototype = BUILDING;
var SUBURB = new Constructor();
