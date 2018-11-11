using Newtonsoft.Json;
using System;
using TibiaInfo.Web.Models.TibiaDataApi.Interfaces;

namespace TibiaInfo.Web.Models.TibiaDataApi.Guilds
{
    public class GuildCharacterInvited
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "invited")]
        public string InvitedOn { get; set; }
    }
}
