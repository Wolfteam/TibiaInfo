using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.Character
{
    public class CharacterWrapperResponse : BaseResponse<CharacterResponse>
    {
        [JsonProperty(PropertyName = "characters")]
        public override CharacterResponse Response { get; set; }
    }
}
