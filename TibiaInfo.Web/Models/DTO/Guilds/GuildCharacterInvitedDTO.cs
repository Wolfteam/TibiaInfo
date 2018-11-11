using System;
using TibiaInfo.Web.Models.DTO.Shared;

namespace TibiaInfo.Web.Models.DTO.Guilds
{
    public class GuildCharacterInvitedDTO : IHasName
    {
        public string Name { get; set; }
        public DateTime InvitedOn { get; set; }
    }
}
