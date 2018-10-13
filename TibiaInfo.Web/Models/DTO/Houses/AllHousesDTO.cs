using System.Collections.Generic;
using TibiaInfo.Web.Enums;

namespace TibiaInfo.Web.Models.DTO.Houses
{
    public class AllHousesDTO
    {
        public TownType Town { get; set; }

        public string World { get; set; }

        public HouseType Type { get; set; }

        public List<SimpleHouseDTO> Houses { get; set; }
    }
}
