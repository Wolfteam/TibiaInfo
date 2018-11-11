using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.News
{
    public class News
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "content")]
        public string Content { get; set; }

        [JsonProperty(PropertyName = "date")]
        public BaseCreatedInformation CreatedAt { get; set; }
    }
}
