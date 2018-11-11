using Newtonsoft.Json;

namespace TibiaInfo.Web.Models.TibiaDataApi.Character
{
    public class Achievement
    {
        [JsonProperty(PropertyName = "stars")]
        public int Stars { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }
}
