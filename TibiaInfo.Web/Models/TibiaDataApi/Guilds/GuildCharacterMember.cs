using Newtonsoft.Json;
using System;
using TibiaInfo.Web.Models.TibiaDataApi.Interfaces;

namespace TibiaInfo.Web.Models.TibiaDataApi.Guilds
{
    public class GuildCharacterMember : IBaseCharacter
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "vocation")]
        public string Vocation { get; set; }

        [JsonProperty(PropertyName = "level")]
        public int Level { get; set; }

        [JsonProperty(PropertyName = "status")]
        public string Status { get; set; }

        [JsonProperty(PropertyName = "nick")]
        public string Nick { get; set; }

        [JsonProperty(PropertyName = "joined")]
        public DateTime JoinedOn { get; set; }
    }
}
