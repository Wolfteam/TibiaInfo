using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.Houses
{
    public class AllHousesWrapperResponse : BaseResponse<AllHousesResponse>
    {
        [JsonProperty(PropertyName = "houses")]
        public override AllHousesResponse Response { get; set; }
    }
}
