using Newtonsoft.Json;
using System.Collections.Generic;

namespace TibiaInfo.Web.Models.TibiaDataApi.Guilds
{
    public class GuildRankMember
    {
        [JsonProperty(PropertyName = "rank_title")]
        public string RankTitle { get; set; }

        [JsonProperty(PropertyName = "characters")]
        public List<GuildCharacterMember> RankMembers { get; set; }
    }
}
