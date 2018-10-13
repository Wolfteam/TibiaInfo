using System.Collections.Generic;
using TibiaInfo.Web.Enums;

namespace TibiaInfo.Web.Models.DTO.News
{
    public class AllNewsDTO
    {
        public NewsType Type { get; set; }

        public List<SimpleNewsDTO> News { get; set; }
    }
}
