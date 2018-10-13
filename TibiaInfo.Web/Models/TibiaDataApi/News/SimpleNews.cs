using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.News
{
    public class SimpleNews
    {
        [JsonProperty(PropertyName = "id")]
        public int ID { get; set; }

        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }

        [JsonProperty(PropertyName = "news")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "apiurl")]
        public string ApiUrl { get; set; }

        [JsonProperty(PropertyName = "tibiaurl")]
        public string TibiaUrl { get; set; }

        [JsonProperty(PropertyName = "date")]
        public BaseCreatedInformation CreatedAt { get; set; }
    }
}
