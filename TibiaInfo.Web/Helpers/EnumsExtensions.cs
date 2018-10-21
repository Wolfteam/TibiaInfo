using System;
using TibiaInfo.Web.Enums;

namespace TibiaInfo.Web.Helpers
{
    public static class EnumsExtensions
    {
        public static SexType GetSexType(this string sex)
        {
            switch (sex)
            {
                case "male":
                    return SexType.MALE;
                case "female":
                    return SexType.FEMALE;
                default:
                    throw new ArgumentOutOfRangeException(nameof(sex), sex, "Could find the sex type enum value");
            }
        }

        public static VocationType GetVocationType(this string vocation)
        {
            switch (vocation)
            {
                case "Knight":
                    return VocationType.KNIGHT;
                case "Elite Knight":
                    return VocationType.ELITE_KNIGHT;
                case "Sorcerer":
                    return VocationType.SORCERER;
                case "Master Sorcerer":
                    return VocationType.MASTER_SORCERER;
                case "Paladin":
                    return VocationType.PALADIN;
                case "Royal Paladin":
                    return VocationType.ROYAL_PALADIN;
                case "Druid":
                    return VocationType.DRUID;
                case "Elder Druid":
                    return VocationType.ELDER_DRUID;
                case "None":
                    return VocationType.NONE;
                default:
                    throw new ArgumentOutOfRangeException(nameof(vocation), vocation, "Couldnt find the vocation type enum value");
            }
        }

        public static StatusType GetStatusType(this string status)
        {
            switch (status)
            {
                case "online":
                    return StatusType.ONLINE;
                case "offline":
                    return StatusType.OFFLINE;
                default:
                    throw new ArgumentOutOfRangeException(nameof(status), status, "Couldnt find the status type enum value");
            }
        }

        public static HighScoreType GetHighScoreType(this string highScore)
        {
            switch (highScore)
            {
                case "experience":
                    return HighScoreType.EXPERIENCE;
                case "magic":
                    return HighScoreType.MAGIC;
                case "shielding":
                    return HighScoreType.SHIELDING;
                case "distance":
                    return HighScoreType.DISTANCE;
                case "sword":
                    return HighScoreType.SWORD;
                case "club":
                    return HighScoreType.CLUB;
                case "axe":
                    return HighScoreType.AXE;
                case "fist":
                    return HighScoreType.FIST;
                case "fishing":
                    return HighScoreType.FISHING;
                case "achievements":
                    return HighScoreType.ACHIEVEMTNS;
                case "loyalty":
                    return HighScoreType.LOYALTY;
                default:
                    throw new ArgumentOutOfRangeException(nameof(highScore), highScore, "Couldnt find the highScore type enum value");
            }
        }

        public static NewsType GetNewsType(this string type)
        {
            string type2 = type.Trim().ToLower().Replace(" ", "");
            switch (type2)
            {
                case "featuredarticle":
                    return NewsType.FEATURED_ARTICLE;
                case "latestnews":
                case "news":
                    return NewsType.LATEST_NEWS;
                case "newstickers":
                case "newsticker":
                    return NewsType.NEWS_TICKER;
                default:
                    throw new ArgumentOutOfRangeException(nameof(type), type, "Couldnt find the news type enum value");
            }
        }

        public static HouseType GetHouseType(this string type)
        {
            string type2 = type.Trim().ToLower().Replace(" ", "");
            switch (type2)
            {
                case "house":
                case "houses":
                    return HouseType.HOUSE;
                case "guildhalls":
                case "guildhall":
                    return HouseType.GUILD_HALLS;
                default:
                    throw new ArgumentOutOfRangeException(nameof(type), type, "Couldnt find the house type enum value");
            }
        }

        public static TownType GetTownType(this string type)
        {
            string type2 = type.Trim().ToLower().Replace(" ", "");
            switch (type2)
            {
                case "ab'dendriel":
                    return TownType.AB_DENDRIEL;
                case "ankrahmun":
                    return TownType.ANKRAHMUN;
                case "carlin":
                    return TownType.CARLIN;
                case "darashia":
                    return TownType.DARASHIA;
                case "edron":
                    return TownType.EDRON;
                case "farmine":
                    return TownType.FARMINE;
                case "graybeach":
                    return TownType.GRAY_BEACH;
                case "kazordoon":
                    return TownType.KAZORDOON;
                case "libertybay":
                    return TownType.LIBERTY_BAY;
                case "porthope":
                    return TownType.PORT_HOPE;
                case "rathleton":
                    return TownType.RATHLETON;
                case "svargrond":
                    return TownType.SVARGROND;
                case "thais":
                    return TownType.THAIS;
                case "venore":
                    return TownType.VENORE;
                case "yalahar":
                    return TownType.YALAHAR;
                default:
                    throw new ArgumentOutOfRangeException(nameof(type), type, "Couldnt find the town type enum value");
            }
        }

        public static WorldPvPType GetWorldPvPType(this string type)
        {
            switch (type)
            {
                case "Optional PvP":
                    return WorldPvPType.OPTIONAL_PVP;
                case "Open PvP":
                    return WorldPvPType.OPEN_PVP;
                case "Hardcore PvP":
                    return WorldPvPType.HARDCORE_PVP;
                case "Retro Open PvP":
                    return WorldPvPType.RETRO_OPEN_PVP;
                case "Retro Hardcore PvP":
                    return WorldPvPType.RETRO_HARDCORE_PVP;
                default:
                    throw new ArgumentOutOfRangeException(nameof(type), type, "Couldnt find the world type enum value");
            }
        }

        public static WorldLocationType GetWorldLocationType(this string type)
        {
            switch (type)
            {
                case "North America":
                    return WorldLocationType.NORTH_AMERICA;
                case "Europe":
                    return WorldLocationType.EUROPE;
                case "South America":
                    return WorldLocationType.SOUTH_AMERICA;
                default:
                    throw new ArgumentOutOfRangeException(nameof(type), type, "Couldnt find the world location type enum value");
            }
        }

        public static string GetHighScore(this HighScoreType highScoreType)
        {
            switch (highScoreType)
            {
                case HighScoreType.EXPERIENCE:
                    return "experience";
                case HighScoreType.MAGIC:
                    return "magic";
                case HighScoreType.SHIELDING:
                    return "shielding";
                case HighScoreType.DISTANCE:
                    return "distance";
                case HighScoreType.SWORD:
                    return "sword";
                case HighScoreType.CLUB:
                    return "club";
                case HighScoreType.AXE:
                    return "axe";
                case HighScoreType.FIST:
                    return "fist";
                case HighScoreType.FISHING:
                    return "fishing";
                case HighScoreType.ACHIEVEMTNS:
                    return "achievements";
                case HighScoreType.LOYALTY:
                    return "loyalty";
                default:
                    throw new ArgumentOutOfRangeException(nameof(highScoreType), highScoreType, "Couldnt find the highScore string value");
            }
        }

        public static string GetVocation(this VocationType vocationType)
        {
            switch (vocationType)
            {
                case VocationType.SORCERER:
                    return "Sorcerer";
                case VocationType.MASTER_SORCERER:
                    return "Master Sorcerer";
                case VocationType.DRUID:
                    return "Druid";
                case VocationType.ELDER_DRUID:
                    return "Elder Druid";
                case VocationType.KNIGHT:
                    return "Knight";
                case VocationType.ELITE_KNIGHT:
                    return "Elite Knight";
                case VocationType.PALADIN:
                    return "Paladin";
                case VocationType.ROYAL_PALADIN:
                    return "Royal Paladin";
                case VocationType.ALL:
                    return "All";
                case VocationType.NONE:
                    return "None";
                default:
                    throw new ArgumentOutOfRangeException(nameof(vocationType), vocationType, "Couldnt find the vocation string value");
            }
        }

        public static string GetTown(this TownType townType)
        {
            switch (townType)
            {
                case TownType.AB_DENDRIEL:
                    return "Ab'Dendriel";
                case TownType.ANKRAHMUN:
                    return "Ankrahmun";
                case TownType.CARLIN:
                    return "Carlin";
                case TownType.DARASHIA:
                    return "Darashia";
                case TownType.EDRON:
                    return "Edron";
                case TownType.FARMINE:
                    return "Farmine";
                case TownType.GRAY_BEACH:
                    return "Gray Beach";
                case TownType.KAZORDOON:
                    return "Kazordoon";
                case TownType.LIBERTY_BAY:
                    return "Liberty Bay";
                case TownType.PORT_HOPE:
                    return "Port Hope";
                case TownType.RATHLETON:
                    return "Rathleton";
                case TownType.SVARGROND:
                    return "Svargrond";
                case TownType.THAIS:
                    return "Thais";
                case TownType.VENORE:
                    return "Venore";
                case TownType.YALAHAR:
                    return "Yalahar";
                default:
                    throw new ArgumentOutOfRangeException(nameof(townType), townType, "Couldnt find the town string value");
            }
        }

        public static string GetHouse(this HouseType houseType)
        {
            switch (houseType)
            {
                case HouseType.HOUSE:
                    return "houses";
                case HouseType.GUILD_HALLS:
                    return "guildhalls";
                default:
                    throw new ArgumentOutOfRangeException(nameof(houseType), houseType, "Couldnt find the house string value");
            }
        }
    }
}
