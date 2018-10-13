using System.Collections.Generic;
using TibiaInfo.Web.Enums;

namespace TibiaInfo.Web.Models.DTO.HighScores
{
    public class AllHighScoresDTO
    {
        public string World { get; set; }

        public HighScoreType HighScoreType { get; set; }

        public List<HighScoreDTO> HighScores { get; set; }
    }
}
