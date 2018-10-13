using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.Houses
{
    public class HouseWrapperResponse : BaseResponse<HouseResponse>
    {
        [JsonProperty(PropertyName = "house")]
        public override HouseResponse Response { get; set; }
    }
}
