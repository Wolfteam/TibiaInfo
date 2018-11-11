using TibiaInfo.Web.Enums;
using TibiaInfo.Web.Models.DTO.Shared;

namespace TibiaInfo.Web.Models.DTO
{
    public class BaseCharacterBDTO : IHasName
    {
        public string Name { get; set; }

        public string World { get; set; }

        public StatusType Status { get; set; }
    }
}
