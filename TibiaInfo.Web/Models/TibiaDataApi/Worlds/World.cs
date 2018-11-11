using Newtonsoft.Json;
using System.Collections.Generic;

namespace TibiaInfo.Web.Models.TibiaDataApi.Worlds
{
    public class World
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "players_online")]
        public int NumberOfPlayersOnline { get; set; }

        [JsonProperty(PropertyName = "online_record")]
        public OnlineRecord OnlineRecord { get; set; }

        [JsonProperty(PropertyName = "creation_date")]
        public string CreationDate { get; set; }

        [JsonProperty(PropertyName = "location")]
        public string Location { get; set; }

        [JsonProperty(PropertyName = "pvp_type")]
        public string PvPType { get; set; }

        [JsonProperty(PropertyName = "world_quest_titles")]
        public List<string> WorldQuestTitles { get; set; }

        [JsonProperty(PropertyName = "battleye_status")]
        public string BattleEyeStatus { get; set; }

        [JsonProperty(PropertyName = "Game World Type")]
        public string GameWorldType { get; set; }
    }
}
