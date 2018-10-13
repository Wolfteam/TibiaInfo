using Newtonsoft.Json;
using System.Collections.Generic;

namespace TibiaInfo.Web.Models.TibiaDataApi.HighScores
{
    public class HighScoreResponse
    {
        [JsonProperty(PropertyName = "world")]
        public string World { get; set; }

        [JsonProperty(PropertyName = "type")]
        public string HighScoreType { get; set; }

        [JsonProperty(PropertyName = "data")]
        public List<HighScore> HighScores { get; set; }
    }
}
