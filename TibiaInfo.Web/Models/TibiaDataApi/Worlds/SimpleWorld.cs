using Newtonsoft.Json;

namespace TibiaInfo.Web.Models.TibiaDataApi.Worlds
{
    public class SimpleWorld
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "online")]
        public int NumberOfPlayersOnline { get; set; }

        [JsonProperty(PropertyName = "location")]
        public string Location { get; set; }

        [JsonProperty(PropertyName = "worldtype")]
        public string PvPType { get; set; }

        [JsonProperty(PropertyName = "additional")]
        public string AdditionalInformation { get; set; }
    }
}
