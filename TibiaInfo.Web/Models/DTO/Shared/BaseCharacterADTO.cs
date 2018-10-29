using TibiaInfo.Web.Enums;

namespace TibiaInfo.Web.Models.DTO.Shared
{
    public class BaseCharacterADTO : IHasName, IhasVocation, IHasLevel
    {
        public string Name { get; set; }

        public VocationType Vocation { get; set; }

        public int Level { get; set; }
    }
}
