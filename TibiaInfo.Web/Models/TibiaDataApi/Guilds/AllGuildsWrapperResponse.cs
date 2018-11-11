using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.Guilds
{
    public class AllGuildsWrapperResponse : BaseResponse<GuildsResponse>
    {
        [JsonProperty(PropertyName = "guilds")]
        public override GuildsResponse Response { get; set; }
    }
}
