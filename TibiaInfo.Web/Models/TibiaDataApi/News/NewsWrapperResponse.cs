using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.News
{
    public class NewsWrapperResponse : BaseResponse<News>
    {
        [JsonProperty(PropertyName = "news")]
        public override News Response { get; set; }
    }
}
