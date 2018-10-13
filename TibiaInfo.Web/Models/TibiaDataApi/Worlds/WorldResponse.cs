using Newtonsoft.Json;
using System.Collections.Generic;

namespace TibiaInfo.Web.Models.TibiaDataApi.Worlds
{
    public class WorldResponse
    {
        [JsonProperty(PropertyName = "world_information")]
        public World World { get; set; }

        [JsonProperty(PropertyName = "players_online")]
        public List<WorldPlayer> PlayersOnline { get; set; }
    }
}
