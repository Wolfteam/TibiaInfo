using Newtonsoft.Json;
using System.Collections.Generic;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.Characters
{
    public class Death
    {
        [JsonProperty(PropertyName = "date")]
        public BaseCreatedInformation DiedAt { get; set; }

        [JsonProperty(PropertyName = "level")]
        public int DiedAtLevel { get; set; }

        [JsonProperty(PropertyName = "reason")]
        public string Reason { get; set; }

        [JsonProperty(PropertyName = "involved")]
        public List<DeathInvolved> Involved { get; set; }
    }
}
