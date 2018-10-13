using Newtonsoft.Json;
using System;

namespace TibiaInfo.Web.Models.TibiaDataApi.Guilds
{
    public class GuildHall
    {
        [JsonProperty(PropertyName = "houseid")]
        public int ID { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "town")]
        public string Town { get; set; }

        [JsonProperty(PropertyName = "paid")]
        public DateTime PaidUntil { get; set; }

        [JsonProperty(PropertyName = "world")]
        public string World { get; set; }
    }
}
