using System;
using TibiaInfo.Web.Enums;
using TibiaInfo.Web.Models.DTO.Shared;

namespace TibiaInfo.Web.Models.DTO
{
    public class GuildCharacterMemberDTO : Shared.BaseCharacterADTO
    {
        public StatusType Status { get; set; }

        public string Nick { get; set; }

        public DateTime JoinedOn { get; set; }
    }
}
