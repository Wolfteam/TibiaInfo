using Newtonsoft.Json;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.Worlds
{
    public class OnlineRecord
    {
        [JsonProperty(PropertyName = "players")]
        public int PlayersOnline { get; set; }

        [JsonProperty(PropertyName = "date")]
        public BaseCreatedInformation At { get; set; }
    }
}
