using Newtonsoft.Json;
using System;

namespace TibiaInfo.Web.Models.TibiaDataApi.Guilds
{
    public class GuildDisbanded
    {
        [JsonProperty(PropertyName = "notification")]
        public string Notification { get; set; }

        [JsonProperty(PropertyName = "date")]
        public DateTime DisbandedOn { get; set; }
    }
}
