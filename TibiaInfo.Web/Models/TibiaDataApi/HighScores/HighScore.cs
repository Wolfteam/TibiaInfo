using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Interfaces;

namespace TibiaInfo.Web.Models.TibiaDataApi.HighScores
{
    public class HighScore
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "voc")]
        public string Vocation { get; set; }

        [JsonProperty(PropertyName = "level")]
        public int LevelPoints { get; set; }

        [JsonProperty(PropertyName = "rank")]
        public int RankPosition { get; set; }

        [JsonProperty(PropertyName = "points")]
        public ulong Points { get; set; }
    }
}
