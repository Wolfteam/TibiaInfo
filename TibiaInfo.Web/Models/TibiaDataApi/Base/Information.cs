using Newtonsoft.Json;
using System;

namespace TibiaInfo.Web.Models.TibiaDataApi.Base
{
    public class Information
    {
        [JsonProperty(PropertyName = "api_version")]
        public int ApiVersion { get; set; }

        [JsonProperty(PropertyName = "execution_time")]
        public double ExecutionTime { get; set; }

        [JsonProperty(PropertyName = "last_updated")]
        public DateTime LastUpdated { get; set; }

        [JsonProperty(PropertyName = "timestamp")]
        public DateTime TimeStamp { get; set; }
    }
}
