using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.Worlds
{
    public class WorldWrapperResponse : BaseResponse<WorldResponse>
    {
        [JsonProperty(PropertyName = "world")]
        public override WorldResponse Response { get; set; }
    }
}
