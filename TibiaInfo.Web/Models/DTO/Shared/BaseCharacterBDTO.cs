using TibiaInfo.Web.Enums;

namespace TibiaInfo.Web.Models.DTO
{
    public class BaseCharacterBDTO
    {
        public string Name { get; set; }

        public string World { get; set; }

        public StatusType Status { get; set; }
    }
}
