using Newtonsoft.Json;
using System.Collections.Generic;

namespace TibiaInfo.Web.Models.TibiaDataApi.News
{
    public class AllNewsResponse
    {
        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }

        [JsonProperty(PropertyName = "data")]
        public List<SimpleNews> News { get; set; }
    }
}
