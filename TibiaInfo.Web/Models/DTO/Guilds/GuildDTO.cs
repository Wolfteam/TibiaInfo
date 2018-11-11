using System;
using System.Collections.Generic;
using TibiaInfo.Web.Models.DTO.Guilds;

namespace TibiaInfo.Web.Models.DTO
{
    public class GuildDTO : BaseGuildDTO
    {
        public bool AcceptsApplication { get; set; }

        public bool IsInWar { get; set; }

        public int MembersOnline { get; set; }

        public int MembersOffline { get; set; }

        public GuildDisbandedDTO Disbanded { get; set; }

        public int TotalMembers { get; set; }

        public int TotalInvited { get; set; }

        public string World { get; set; }

        public DateTime FoundedOn { get; set; }

        public bool IsActive { get; set; }

        public string HomePageUrl { get; set; }


        public CharacterHouseDTO Guildhall { get; set; }
        public List<GuildRankMemberDTO> Ranks { get; set; }
        public List<GuildCharacterInvitedDTO> Invited { get; set; }
    }
}
