using Newtonsoft.Json;

namespace TibiaInfo.Web.Models.TibiaDataApi.Houses
{
    public class SimpleHouse
    {
        [JsonProperty(PropertyName = "houseid")]
        public int ID { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "size")]
        public int Size { get; set; }

        [JsonProperty(PropertyName = "rent")]
        public int Rent { get; set; }

        [JsonProperty(PropertyName = "status")]
        public string Status { get; set; }
    }
}
