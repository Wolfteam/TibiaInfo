using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.Guilds
{
    public class GuildWrapperResponse : BaseResponse<GuildResponse>
    {
        [JsonProperty(PropertyName = "guild")]
        public override GuildResponse Response { get; set; }
    }
}
