using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.Worlds
{
    public class AllWorldsWrapperResponse : BaseResponse<AllWorldsResponse>
    {
        [JsonProperty(PropertyName = "worlds")]
        public override AllWorldsResponse Response { get; set; }
    }
}
