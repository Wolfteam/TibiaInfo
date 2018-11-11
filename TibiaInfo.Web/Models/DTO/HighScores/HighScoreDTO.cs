using TibiaInfo.Web.Enums;

namespace TibiaInfo.Web.Models.DTO.HighScores
{
    public class HighScoreDTO
    {
        public string Name { get; set; }

        public VocationType Vocation { get; set; }

        public int LevelPoints { get; set; }

        public int RankPosition { get; set; }

        public ulong Points { get; set; }
    }
}
