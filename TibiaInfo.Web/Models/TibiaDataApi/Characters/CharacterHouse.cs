using Newtonsoft.Json;

namespace TibiaInfo.Web.Models.TibiaDataApi.Character
{
    public class CharacterHouse
    {
        [JsonProperty(PropertyName = "houseid")]
        public int HouseID { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "town ")]
        public string Town { get; set; }

        [JsonProperty(PropertyName = "paid ")]
        public string Paid { get; set; }

        [JsonProperty(PropertyName = "world")]
        public string World { get; set; }
    }
}
