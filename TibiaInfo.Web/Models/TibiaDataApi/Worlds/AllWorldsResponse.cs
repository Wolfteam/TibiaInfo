using Newtonsoft.Json;
using System.Collections.Generic;

namespace TibiaInfo.Web.Models.TibiaDataApi.Worlds
{
    public class AllWorldsResponse
    {
        [JsonProperty(PropertyName = "online")]
        public int TotalPlayersOnline { get; set; }

        [JsonProperty(PropertyName = "allworlds")]
        public List<SimpleWorld> Worlds { get; set; }
    }
}
