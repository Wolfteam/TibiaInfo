using TibiaInfo.Web.Enums;
using TibiaInfo.Web.Models.DTO.Shared;

namespace TibiaInfo.Web.Models.DTO.Characters
{
    public class SimpleCharacterDTO : BaseCharacterADTO
    {
        public string World { get; set; }

        public StatusType Status { get; set; }

        public SexType Sex { get; set; }

        public string Residence { get; set; }
    }
}
