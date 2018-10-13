using Newtonsoft.Json;
using System.Collections.Generic;

namespace TibiaInfo.Web.Models.TibiaDataApi.Houses
{
    public class AllHousesResponse
    {
        [JsonProperty(PropertyName = "town")]
        public string Town { get; set; }

        [JsonProperty(PropertyName = "world")]
        public string World { get; set; }

        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }

        [JsonProperty(PropertyName = "houses")]
        public List<SimpleHouse> Houses { get; set; }
    }
}
