using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Interfaces;

namespace TibiaInfo.Web.Models.TibiaDataApi.Worlds
{
    public class WorldPlayer : IBaseCharacter
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "vocation")]
        public string Vocation { get; set; }

        [JsonProperty(PropertyName = "level")]
        public int Level { get; set; }
    }
}
