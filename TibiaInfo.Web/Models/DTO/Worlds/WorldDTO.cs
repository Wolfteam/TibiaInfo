using System.Collections.Generic;
using TibiaInfo.Web.Enums;
using TibiaInfo.Web.Models.DTO.Shared;

namespace TibiaInfo.Web.Models.DTO.Worlds
{
    public class WorldDTO
    {
        public string Name { get; set; }

        public int NumberOfPlayersOnline { get; set; }

        public OnlineRecordDTO OnlineRecord { get; set; }

        public string CreationDate { get; set; }

        public VocationType Location { get; set; }

        public WorldPvPType PvpType { get; set; }

        public List<string> WorldQuestTitles { get; set; }

        public string BattleEyeStatus { get; set; }

        public string GameWorldType { get; set; }

        public List<BaseCharacterADTO> PlayersOnline { get; set; }
    }
}
