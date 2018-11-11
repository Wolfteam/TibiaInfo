using TibiaInfo.Web.Enums;

namespace TibiaInfo.Web.Models.DTO.Worlds
{
    public class SimpleWorldDTO
    {
        public string Name { get; set; }

        public int NumberOfPlayersOnline { get; set; }

        public WorldLocationType Location { get; set; }

        public WorldPvPType PvpType { get; set; }

        public string AdditionalInformation { get; set; }
    }
}
