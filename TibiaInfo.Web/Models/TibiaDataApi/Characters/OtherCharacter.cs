using Newtonsoft.Json;

namespace TibiaInfo.Web.Models.TibiaDataApi.Character
{
    public class OtherCharacter
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "world")]
        public string World { get; set; }

        [JsonProperty(PropertyName = "status")]
        public string Status { get; set; }
    }
}
