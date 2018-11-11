using Newtonsoft.Json;
using System.Collections.Generic;

namespace TibiaInfo.Web.Models.TibiaDataApi.Guilds
{
    public class GuildsResponse
    {
        [JsonProperty(PropertyName = "world")]
        public string World { get; set; }

        [JsonProperty(PropertyName = "active")]
        public List<BaseGuild> Active { get; set; }

        [JsonProperty(PropertyName = "formation")]
        public List<BaseGuild> Formation { get; set; }
    }
}
