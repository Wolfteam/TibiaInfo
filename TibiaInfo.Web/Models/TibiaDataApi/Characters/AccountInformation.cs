using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.Character
{
    public class AccountInformation
    {
        [JsonProperty(PropertyName = "loyalty_title")]
        public string LoyaltyTitle { get; set; }

        [JsonProperty(PropertyName = "created")]
        public BaseCreatedInformation CreatedAt { get; set; }
    }
}
