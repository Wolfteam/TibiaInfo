using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Interfaces;

namespace TibiaInfo.Web.Models.TibiaDataApi.Base
{
    public abstract class BaseResponse<T> : IBaseResponse<T>
    {
        public abstract T Response { get; set; }

        [JsonProperty(PropertyName = "information")]
        public Information Information { get; set; }
    }
}
