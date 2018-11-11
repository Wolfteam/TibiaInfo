using System.Collections.Generic;

namespace TibiaInfo.Web.Models.DTO.Worlds
{
    public class AllWorldsDTO
    {
        public int TotalPlayersOnline { get; set; }

        public List<SimpleWorldDTO> Worlds { get; set; }
    }
}
