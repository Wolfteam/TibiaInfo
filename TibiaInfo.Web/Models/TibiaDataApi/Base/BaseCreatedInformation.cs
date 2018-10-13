using Newtonsoft.Json;

namespace TibiaInfo.Web.Models.TibiaDataApi.Base
{
    public class BaseCreatedInformation
    {
        [JsonProperty(PropertyName = "date")]
        public string Date { get; set; }

        [JsonProperty(PropertyName = "timezone_type")]
        public int TimezoneType { get; set; }

        [JsonProperty(PropertyName = "timezone")]
        public string Timezone { get; set; }
    }
}
