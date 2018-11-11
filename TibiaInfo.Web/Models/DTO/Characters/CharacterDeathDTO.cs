using System.Collections.Generic;

namespace TibiaInfo.Web.Models.DTO.Characters
{
    public class CharacterDeathDTO
    {
        public CreatedInformationDTO DiedAt { get; set; }

        public int DiedAtLevel { get; set; }

        public string Reason { get; set; }

        public List<DeathInvolvedDTO> Involved { get; set; }
    }
}
