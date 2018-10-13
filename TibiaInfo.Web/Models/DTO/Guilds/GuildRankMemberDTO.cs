using System.Collections.Generic;

namespace TibiaInfo.Web.Models.DTO
{
    public class GuildRankMemberDTO
    {
        public string RankTitle { get; set; }

        public List<GuildCharacterMemberDTO> RankMembers { get; set; }
    }
}
