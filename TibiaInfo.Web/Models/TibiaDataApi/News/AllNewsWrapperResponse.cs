using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.News
{
    public class AllNewsWrapperResponse : BaseResponse<AllNewsResponse>
    {
        [JsonProperty(PropertyName = "newslist")]
        public override AllNewsResponse Response { get; set; }
    }
}
