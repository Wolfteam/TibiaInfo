using Newtonsoft.Json;

namespace TibiaInfo.Web.Models.TibiaDataApi.Character
{
    public class CharacterHouse
    {
        [JsonProperty(PropertyName = "houseid")]
        public int ID { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "town")]
        public string Town { get; set; }

        [JsonProperty(PropertyName = "paid")]
        public string PaidUntil { get; set; }

        [JsonProperty(PropertyName = "world")]
        public string World { get; set; }
    }
}
