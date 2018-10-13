using System.Collections.Generic;
using TibiaInfo.Web.Enums;
using TibiaInfo.Web.Models.DTO.Characters;
using TibiaInfo.Web.Models.DTO.Shared;

namespace TibiaInfo.Web.Models.DTO
{
    public class CharacterDTO : Shared.BaseCharacterADTO
    {
        public string World { get; set; }

        public StatusType Status { get; set; }

        public SexType Sex { get; set; }

        public int AchievementPoints { get; set; }

        public string Residence { get; set; }

        public string MarriedTo { get; set; }

        public string Comment { get; set; }

        public AccountStatusType AccountStatus { get; set; }

        public CreatedInformationDTO LastLogin { get; set; }
        public List<CharacterDeathDTO> Deaths { get; set; }
        public AccountInformationDTO AccountInformation { get; set; }
        public List<AchievementDTO> Achievements { get; set; }
        public GuildMemberDTO Guild { get; set; }
        public CharacterHouseDTO House { get; set; }
        public List<BaseCharacterBDTO> OtherCharacters { get; set; }
    }
}
