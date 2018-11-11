using Newtonsoft.Json;
using System.Collections.Generic;

namespace TibiaInfo.Web.Models.TibiaDataApi.Guilds
{
    public class GuildResponse
    {
        [JsonProperty(PropertyName = "data")]
        public Guild Guild { get; set; }

        [JsonProperty(PropertyName = "members")]
        public List<GuildRankMember> Ranks { get; set; }

        [JsonProperty(PropertyName = "invited")]
        public List<GuildCharacterInvited> Invited { get; set; }

        [JsonProperty(PropertyName = "error")]
        public string Error { get; set; }
    }
}
