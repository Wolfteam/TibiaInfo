using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.HighScores
{
    public class HighScoreWrapperResponse : BaseResponse<HighScoreResponse>
    {
        [JsonProperty(PropertyName = "highscores")]
        public override HighScoreResponse Response { get; set; }
    }
}
