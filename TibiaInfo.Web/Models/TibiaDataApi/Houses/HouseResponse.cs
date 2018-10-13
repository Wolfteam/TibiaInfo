using Newtonsoft.Json;

namespace TibiaInfo.Web.Models.TibiaDataApi.Houses
{
    public class HouseResponse
    {
        [JsonProperty(PropertyName = "houseid")]
        public int ID { get; set; }

        [JsonProperty(PropertyName = "world")]
        public string World { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }

        [JsonProperty(PropertyName = "beds")]
        public int NumberOfBeds { get; set; }

        [JsonProperty(PropertyName = "size")]
        public int Size { get; set; }

        [JsonProperty(PropertyName = "rent")]
        public int Rent { get; set; }

        [JsonProperty(PropertyName = "img")]
        public string ImageUrl { get; set; }

        [JsonProperty(PropertyName = "status")]
        public HouseStatus Status { get; set; }
    }
}
