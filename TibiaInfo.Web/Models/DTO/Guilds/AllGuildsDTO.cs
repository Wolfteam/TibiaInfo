using System.Collections.Generic;

namespace TibiaInfo.Web.Models.DTO
{
    public class AllGuildsDTO
    {
        public string World { get; set; }
        public List<BaseGuildDTO> Active { get; set; }
        public List<BaseGuildDTO> Formation { get; set; }
    }
}
